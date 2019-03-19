import { use } from '../utils';
import { TouchMixin } from '../mixins/touch';

var _use = use('slider'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [TouchMixin],
  props: {
    min: Number,
    value: Number,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    barHeight: {
      type: String,
      default: '2px'
    }
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
    },
    onTouchMove: function onTouchMove(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.disabled) return;
      this.touchMove(event);
      var rect = this.$el.getBoundingClientRect();
      var diff = this.deltaX / rect.width * 100;
      this.updateValue(this.startValue + diff);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.disabled) return;
      this.updateValue(this.value, true);
    },
    onClick: function onClick(event) {
      event.stopPropagation();
      if (this.disabled) return;
      var rect = this.$el.getBoundingClientRect();
      var value = (event.clientX - rect.left) / rect.width * 100;
      this.updateValue(value, true);
    },
    updateValue: function updateValue(value, end) {
      value = this.format(value);
      this.$emit('input', value);

      if (end) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
    }
  },
  render: function render(h) {
    var style = {
      background: this.inactiveColor
    };
    var barStyle = {
      width: this.format(this.value) + "%",
      height: this.barHeight,
      background: this.activeColor
    };
    return h("div", {
      "style": style,
      "class": bem({
        disabled: this.disabled
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('bar'),
      "style": barStyle
    }, [h("div", {
      "class": bem('button-wrapper'),
      "on": {
        "touchstart": this.onTouchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd
      }
    }, [this.slots('button') || h("div", {
      "class": bem('button')
    })])])]);
  }
});