import { use } from '../utils';
import Loading from '../loading';
import { TouchMixin } from '../mixins/touch';
import { getScrollTop, getScrollEventTarget } from '../utils/scroll';

var _use = use('pull-refresh'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var TEXT_STATUS = ['pulling', 'loosing', 'success'];
export default sfc({
  mixins: [TouchMixin],
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    value: {
      type: Boolean,
      required: true
    },
    successDuration: {
      type: Number,
      default: 500
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    }
  },
  data: function data() {
    return {
      status: 'normal',
      height: 0,
      duration: 0
    };
  },
  computed: {
    untouchable: function untouchable() {
      return this.status === 'loading' || this.status === 'success' || this.disabled;
    }
  },
  watch: {
    value: function value(loading) {
      var _this = this;

      this.duration = this.animationDuration;

      if (!loading && this.successText) {
        this.status = 'success';
        setTimeout(function () {
          _this.setStatus(0);
        }, this.successDuration);
      } else {
        this.setStatus(loading ? this.headHeight : 0, loading);
      }
    }
  },
  mounted: function mounted() {
    this.scrollEl = getScrollEventTarget(this.$el);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (!this.untouchable && this.getCeiling()) {
        this.duration = 0;
        this.touchStart(event);
      }
    },
    onTouchMove: function onTouchMove(event) {
      if (this.untouchable) {
        return;
      }

      this.touchMove(event);

      if (!this.ceiling && this.getCeiling()) {
        this.duration = 0;
        this.startY = event.touches[0].clientY;
        this.deltaY = 0;
      }

      if (this.ceiling && this.deltaY >= 0) {
        if (this.direction === 'vertical') {
          this.setStatus(this.ease(this.deltaY));
          event.cancelable && event.preventDefault();
        }
      }
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.untouchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === 'loosing') {
          this.setStatus(this.headHeight, true);
          this.$emit('input', true);
          this.$emit('refresh');
        } else {
          this.setStatus(0);
        }
      }
    },
    getCeiling: function getCeiling() {
      this.ceiling = getScrollTop(this.scrollEl) === 0;
      return this.ceiling;
    },
    ease: function ease(height) {
      var headHeight = this.headHeight;
      return height < headHeight ? height : height < headHeight * 2 ? Math.round(headHeight + (height - headHeight) / 2) : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
    },
    setStatus: function setStatus(height, isLoading) {
      this.height = height;
      var status = isLoading ? 'loading' : height === 0 ? 'normal' : height < this.headHeight ? 'pulling' : 'loosing';

      if (status !== this.status) {
        this.status = status;
      }
    }
  },
  render: function render(h) {
    var status = this.status;
    var text = this[status + "Text"] || t(status);
    var style = {
      transition: this.duration + "ms",
      transform: "translate3d(0," + this.height + "px, 0)"
    };
    var Status = this.slots(status) || [TEXT_STATUS.indexOf(status) !== -1 && h("div", {
      "class": bem('text')
    }, [text]), status === 'loading' && h("div", {
      "class": bem('loading')
    }, [h(Loading), h("span", [text])])];
    return h("div", {
      "class": bem()
    }, [h("div", {
      "class": bem('track'),
      "style": style,
      "on": {
        "touchstart": this.onTouchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [h("div", {
      "class": bem('head')
    }, [Status]), this.slots()])]);
  }
});