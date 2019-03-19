import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import Button from '../button';
import { emit, inherit } from '../utils/functional';
import { functionalRoute, routeProps } from '../utils/router'; // Types

var _use = use('goods-action-big-btn'),
    sfc = _use[0],
    bem = _use[1];

function GoodsActionBigBtn(h, props, slots, ctx) {
  var onClick = function onClick(event) {
    emit(ctx, 'click', event);
    functionalRoute(ctx);
  };

  return h(Button, _mergeJSXProps([{
    "attrs": {
      "square": true,
      "size": "large",
      "loading": props.loading,
      "disabled": props.disabled,
      "type": props.primary ? 'danger' : 'warning'
    },
    "class": bem(),
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [slots.default ? slots.default() : props.text]);
}

GoodsActionBigBtn.props = _extends({}, routeProps, {
  text: String,
  primary: Boolean,
  loading: Boolean,
  disabled: Boolean
});
export default sfc(GoodsActionBigBtn);