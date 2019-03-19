import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import Icon from '../icon';
import { emit, inherit } from '../utils/functional';
import { functionalRoute, routeProps } from '../utils/router'; // Types

var _use = use('goods-action-mini-btn'),
    sfc = _use[0],
    bem = _use[1];

function GoodsActionMiniBtn(h, props, slots, ctx) {
  var onClick = function onClick(event) {
    emit(ctx, 'click', event);
    functionalRoute(ctx);
  };

  return h("div", _mergeJSXProps([{
    "class": [bem(), 'van-hairline'],
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [h(Icon, {
    "class": [bem('icon'), props.iconClass],
    "attrs": {
      "tag": "div",
      "info": props.info,
      "name": props.icon
    }
  }), slots.default ? slots.default() : props.text]);
}

GoodsActionMiniBtn.props = _extends({}, routeProps, {
  text: String,
  icon: String,
  info: [String, Number],
  iconClass: null
});
export default sfc(GoodsActionMiniBtn);