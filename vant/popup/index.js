import { use } from '../utils';
import { PopupMixin } from '../mixins/popup';

var _use = use('popup'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [PopupMixin],
  props: {
    position: String,
    transition: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  render: function render(h) {
    var _this = this,
        _bem;

    if (!this.shouldRender) {
      return;
    }

    var position = this.position;

    var emit = function emit(event) {
      return function () {
        return _this.$emit(event);
      };
    };

    var transitionName = this.transition || (position ? "van-popup-slide-" + position : 'van-fade');
    return h("transition", {
      "attrs": {
        "name": transitionName
      },
      "on": {
        "afterEnter": emit('opened'),
        "afterLeave": emit('closed')
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": bem((_bem = {}, _bem[position] = position, _bem))
    }, [this.slots()])]);
  }
});