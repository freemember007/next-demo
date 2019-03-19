import { use } from '../utils';
import Loading from '../loading';
import { on, off } from '../utils/event';
import { getScrollTop, getElementTop, getVisibleHeight, getScrollEventTarget } from '../utils/scroll';

var _use = use('list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

export default sfc({
  model: {
    prop: 'loading'
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  mounted: function mounted() {
    this.scroller = getScrollEventTarget(this.$el);
    this.handler(true);

    if (this.immediateCheck) {
      this.$nextTick(this.check);
    }
  },
  destroyed: function destroyed() {
    this.handler(false);
  },
  activated: function activated() {
    this.handler(true);
  },
  deactivated: function deactivated() {
    this.handler(false);
  },
  watch: {
    loading: function loading() {
      this.$nextTick(this.check);
    },
    finished: function finished() {
      this.$nextTick(this.check);
    }
  },
  methods: {
    check: function check() {
      if (this.loading || this.finished || this.error) {
        return;
      }

      var el = this.$el;
      var scroller = this.scroller;
      var scrollerHeight = getVisibleHeight(scroller);
      /* istanbul ignore next */

      if (!scrollerHeight || window.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return;
      }

      var scrollTop = getScrollTop(scroller);
      var targetBottom = scrollTop + scrollerHeight;
      var reachBottom = false;
      /* istanbul ignore next */

      if (el === scroller) {
        reachBottom = scroller.scrollHeight - targetBottom < this.offset;
      } else {
        var elBottom = getElementTop(el) - getElementTop(scroller) + getVisibleHeight(el);
        reachBottom = elBottom - scrollerHeight < this.offset;
      }
      /* istanbul ignore else */


      if (reachBottom) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },
    clickErrorText: function clickErrorText() {
      this.$emit('update:error', false);
      this.$nextTick(this.check);
    },
    handler: function handler(bind) {
      /* istanbul ignore else */
      if (this.binded !== bind) {
        this.binded = bind;
        (bind ? on : off)(this.scroller, 'scroll', this.check);
      }
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem()
    }, [this.slots(), this.loading && h("div", {
      "class": bem('loading'),
      "key": "loading"
    }, [this.slots('loading') || [h(Loading, {
      "class": bem('loading-icon')
    }), h("span", {
      "class": bem('loading-text')
    }, [this.loadingText || t('loading')])]]), this.finished && this.finishedText && h("div", {
      "class": bem('finished-text')
    }, [this.finishedText]), this.error && this.errorText && h("div", {
      "on": {
        "click": this.clickErrorText
      },
      "class": bem('error-text')
    }, [this.errorText])]);
  }
});