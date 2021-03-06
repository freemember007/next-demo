import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional';
import Cell from '../cell';
import Switch from '../switch';
import { switchProps } from '../switch/shared'; // Types

var _use = use('switch-cell'),
    sfc = _use[0],
    bem = _use[1];

function SwitchCell(h, props, slots, ctx) {
  return h(Cell, _mergeJSXProps([{
    "attrs": {
      "center": true,
      "title": props.title,
      "border": props.border
    },
    "class": bem()
  }, inherit(ctx)]), [h(Switch, {
    "props": _extends({}, props),
    "on": _extends({}, ctx.listeners)
  })]);
}

SwitchCell.props = _extends({}, switchProps, {
  title: String,
  border: Boolean,
  size: {
    type: String,
    default: '24px'
  }
});
export default sfc(SwitchCell);