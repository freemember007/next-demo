import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional'; // Types

var _use = use('goods-action'),
    sfc = _use[0],
    bem = _use[1];

function GoodsAction(h, props, slots, ctx) {
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx, true)]), [slots.default && slots.default()]);
}

export default sfc(GoodsAction);