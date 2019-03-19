import { use } from '../utils';
import Icon from '../icon';

var _use = use('notice-bar'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    background: String,
    delay: {
      type: [String, Number],
      default: 1
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  data: function data() {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: ''
    };
  },
  watch: {
    text: {
      handler: function handler() {
        var _this = this;

        this.$nextTick(function () {
          var _this$$refs = _this.$refs,
              wrap = _this$$refs.wrap,
              content = _this$$refs.content;

          if (!wrap || !content) {
            return;
          }

          var wrapWidth = wrap.getBoundingClientRect().width;
          var offsetWidth = content.getBoundingClientRect().width;

          if (_this.scrollable && offsetWidth > wrapWidth) {
            _this.wrapWidth = wrapWidth;
            _this.offsetWidth = offsetWidth;
            _this.duration = offsetWidth / _this.speed;
            _this.animationClass = bem('play');
          }
        });
      },
      immediate: true
    }
  },
  methods: {
    onClickIcon: function onClickIcon() {
      if (this.mode === 'closeable') {
        this.showNoticeBar = false;
        this.$emit('close');
      }
    },
    onAnimationEnd: function onAnimationEnd() {
      var _this2 = this;

      this.firstRound = false;
      this.$nextTick(function () {
        _this2.duration = (_this2.offsetWidth + _this2.wrapWidth) / _this2.speed;
        _this2.animationClass = bem('play--infinite');
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    var mode = this.mode;
    var iconName = mode === 'closeable' ? 'cross' : mode === 'link' ? 'arrow' : '';
    var barStyle = {
      color: this.color,
      background: this.background
    };
    var contentStyle = {
      paddingLeft: this.firstRound ? 0 : this.wrapWidth + 'px',
      animationDelay: (this.firstRound ? this.delay : 0) + 's',
      animationDuration: this.duration + 's'
    };
    return h("div", {
      "directives": [{
        name: "show",
        value: this.showNoticeBar
      }],
      "class": bem({
        withicon: mode
      }),
      "style": barStyle,
      "on": {
        "click": function click() {
          _this3.$emit('click');
        }
      }
    }, [this.leftIcon && h(Icon, {
      "class": bem('left-icon'),
      "attrs": {
        "name": this.leftIcon
      }
    }), h("div", {
      "ref": "wrap",
      "class": bem('wrap')
    }, [h("div", {
      "ref": "content",
      "class": [bem('content'), this.animationClass, {
        'van-ellipsis': !this.scrollable
      }],
      "style": contentStyle,
      "on": {
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [this.slots() || this.text])]), iconName && h(Icon, {
      "class": bem('right-icon'),
      "attrs": {
        "name": iconName
      },
      "on": {
        "click": this.onClickIcon
      }
    })]);
  }
});