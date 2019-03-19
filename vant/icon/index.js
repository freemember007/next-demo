import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional';
import Info from '../info';
import { isSrc } from '../utils/validate/src'; // Types

var _use = use('icon'),
    sfc = _use[0];

function Icon(h, props, slots, ctx) {
  var urlIcon = isSrc(props.name);
  return h(props.tag, _mergeJSXProps([{
    "class": [props.classPrefix, urlIcon ? 'van-icon--image' : props.classPrefix + "-" + props.name],
    "style": {
      color: props.color,
      fontSize: props.size
    }
  }, inherit(ctx, true)]), [slots.default && slots.default(), urlIcon && h("img", {
    "attrs": {
      "src": props.name
    }
  }), h(Info, {
    "attrs": {
      "info": props.info
    }
  })]);
}

Icon.props = {
  name: String,
  size: String,
  color: String,
  info: [String, Number],
  tag: {
    type: String,
    default: 'i'
  },
  classPrefix: {
    type: String,
    default: 'van-icon'
  }
};
export default sfc(Icon);