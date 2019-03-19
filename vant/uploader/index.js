import _extends from "@babel/runtime/helpers/esm/extends";
import { use } from '../utils';

var _use = use('uploader'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    beforeRead: Function,
    afterRead: Function,
    accept: {
      type: String,
      default: 'image/*'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    }
  },
  methods: {
    onChange: function onChange(event) {
      var _this = this;

      var files = event.target.files;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files, 0);

      if (!files || this.beforeRead && !this.beforeRead(files)) {
        this.resetInput();
        return;
      }

      if (Array.isArray(files)) {
        Promise.all(files.map(this.readFile)).then(function (contents) {
          var oversize = false;
          var payload = files.map(function (file, index) {
            if (file.size > _this.maxSize) {
              oversize = true;
            }

            return {
              file: files[index],
              content: contents[index]
            };
          });

          _this.onAfterRead(payload, oversize);
        });
      } else {
        this.readFile(files).then(function (content) {
          _this.onAfterRead({
            file: files,
            content: content
          }, files.size > _this.maxSize);
        });
      }
    },
    readFile: function readFile(file) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var reader = new FileReader();

        reader.onload = function (event) {
          resolve(event.target.result);
        };

        if (_this2.resultType === 'dataUrl') {
          reader.readAsDataURL(file);
        } else if (_this2.resultType === 'text') {
          reader.readAsText(file);
        }
      });
    },
    onAfterRead: function onAfterRead(files, oversize) {
      if (oversize) {
        this.$emit('oversize', files);
      } else {
        this.afterRead && this.afterRead(files);
      }

      this.resetInput();
    },
    resetInput: function resetInput() {
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    }
  },
  render: function render(h) {
    var accept = this.accept,
        disabled = this.disabled;
    return h("div", {
      "class": bem()
    }, [this.slots(), h("input", {
      "attrs": _extends({}, this.$attrs, {
        "type": "file",
        "accept": accept,
        "disabled": disabled
      }),
      "ref": "input",
      "class": bem('input'),
      "on": {
        "change": this.onChange
      }
    })]);
  }
});