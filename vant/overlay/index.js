import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/esm/extends";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional'; // Types

var _use = use('overlay'),
    sfc = _use[0],
    bem = _use[1];

function Overlay(h, props, slots, ctx) {
  var style = _extends({
    zIndex: props.zIndex
  }, props.customStyle);

  return h("transition", {
    "attrs": {
      "name": "van-fade"
    }
  }, [h("div", _mergeJSXProps([{
    "directives": [{
      name: "show",
      value: props.visible
    }],
    "style": style,
    "class": [bem(), props.className],
    "on": {
      "touchmove": function touchmove(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      "click": function click(event) {
        emit(ctx, 'click', event);
      }
    }
  }, inherit(ctx, true)]))]);
}

Overlay.props = {
  zIndex: Number,
  className: null,
  visible: Boolean,
  customStyle: Object
};
export default sfc(Overlay);