import { deepClone } from '../utils/deep-clone';
import { use, isObj, range } from '../utils';
var DEFAULT_DURATION = 200;

var _use = use('picker-column'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    initialOptions: Array,
    visibleItemCount: Number
  },
  data: function data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: deepClone(this.initialOptions),
      currentIndex: this.defaultIndex
    };
  },
  created: function created() {
    this.$parent.children && this.$parent.children.push(this);
    this.setIndex(this.currentIndex);
  },
  destroyed: function destroyed() {
    var children = this.$parent.children;
    children && children.splice(children.indexOf(this), 1);
  },
  watch: {
    defaultIndex: function defaultIndex() {
      this.setIndex(this.defaultIndex);
    }
  },
  computed: {
    count: function count() {
      return this.options.length;
    }
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startOffset = this.offset;
      this.duration = 0;
    },
    onTouchMove: function onTouchMove(event) {
      event.preventDefault();
      var deltaY = event.touches[0].clientY - this.startY;
      this.offset = range(this.startOffset + deltaY, -(this.count * this.itemHeight), this.itemHeight);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION;
        var index = range(Math.round(-this.offset / this.itemHeight), 0, this.count - 1);
        this.setIndex(index, true);
      }
    },
    adjustIndex: function adjustIndex(index) {
      index = range(index, 0, this.count);

      for (var i = index; i < this.count; i++) {
        if (!this.isDisabled(this.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!this.isDisabled(this.options[_i])) return _i;
      }
    },
    isDisabled: function isDisabled(option) {
      return isObj(option) && option.disabled;
    },
    getOptionText: function getOptionText(option) {
      return isObj(option) && this.valueKey in option ? option[this.valueKey] : option;
    },
    setIndex: function setIndex(index, userAction) {
      index = this.adjustIndex(index) || 0;
      this.offset = -index * this.itemHeight;

      if (index !== this.currentIndex) {
        this.currentIndex = index;
        userAction && this.$emit('change', index);
      }
    },
    setValue: function setValue(value) {
      var options = this.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
    },
    getValue: function getValue() {
      return this.options[this.currentIndex];
    }
  },
  render: function render(h) {
    var _this = this;

    var itemHeight = this.itemHeight,
        visibleItemCount = this.visibleItemCount;
    var columnStyle = {
      height: itemHeight * visibleItemCount + 'px'
    };
    var baseOffset = itemHeight * (visibleItemCount - 1) / 2;
    var wrapperStyle = {
      transition: this.duration + "ms",
      transform: "translate3d(0, " + (this.offset + baseOffset) + "px, 0)",
      lineHeight: itemHeight + "px"
    };
    var optionStyle = {
      height: itemHeight + "px"
    };
    return h("div", {
      "style": columnStyle,
      "class": [bem(), this.className],
      "on": {
        "touchstart": this.onTouchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [h("ul", {
      "style": wrapperStyle
    }, [this.options.map(function (option, index) {
      return h("li", {
        "style": optionStyle,
        "class": ['van-ellipsis', bem('item', {
          disabled: _this.isDisabled(option),
          selected: index === _this.currentIndex
        })],
        "domProps": {
          "innerHTML": _this.getOptionText(option)
        },
        "on": {
          "click": function click() {
            _this.setIndex(index, true);
          }
        }
      });
    })])]);
  }
});