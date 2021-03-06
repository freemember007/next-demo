import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { RED, WHITE } from '../utils/color';
import { emit, inherit } from '../utils/functional';
import { PopupMixin } from '../mixins/popup';
import Popup from '../popup'; // Types

var _use = use('notify'),
    sfc = _use[0],
    bem = _use[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background
  };
  return h(Popup, _mergeJSXProps([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "lockScroll": false
    },
    "style": style,
    "class": [bem(), props.className],
    "on": {
      "input": function input(value) {
        emit(ctx, 'input', value);
      }
    }
  }, inherit(ctx)]), [props.message]);
}

Notify.props = _extends({}, PopupMixin.props, {
  className: null,
  message: [String, Number],
  color: {
    type: String,
    default: WHITE
  },
  background: {
    type: String,
    default: RED
  },
  duration: {
    type: Number,
    default: 3000
  }
});
export default sfc(Notify);