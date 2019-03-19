import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional'; // Types

var _use = use('loading'),
    sfc = _use[0],
    bem = _use[1];

var DEFAULT_COLOR = '#c9c9c9';

function Loading(h, props, slots, ctx) {
  var color = props.color,
      size = props.size,
      type = props.type;
  var colorType = color === 'white' || color === 'black' ? color : '';
  var style = {
    color: color === 'black' ? DEFAULT_COLOR : color,
    width: size,
    height: size
  };
  var Spin = [];

  if (type === 'spinner') {
    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }
  }

  var Circular = type === 'circular' && h("svg", {
    "class": bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50"
    }
  }, [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none"
    }
  })]);
  return h("div", _mergeJSXProps([{
    "class": bem([type, colorType]),
    "style": style
  }, inherit(ctx, true)]), [h("span", {
    "class": bem('spinner', type)
  }, [Spin, Circular])]);
}

Loading.props = {
  size: String,
  type: {
    type: String,
    default: 'circular'
  },
  color: {
    type: String,
    default: DEFAULT_COLOR
  }
};
export default sfc(Loading);