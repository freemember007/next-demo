import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional'; // Types

var _use = use('password-input'),
    sfc = _use[0],
    bem = _use[1];

function PasswordInput(h, props, slots, ctx) {
  var info = props.errorInfo || props.info;
  var Points = [];

  for (var i = 0; i < props.length; i++) {
    var char = props.value[i];
    Points.push(h("li", {
      "class": "van-hairline"
    }, [props.mask ? h("i", {
      "style": {
        visibility: char ? 'visible' : 'hidden'
      }
    }) : char]));
  }

  return h("div", {
    "class": bem()
  }, [h("ul", _mergeJSXProps([{
    "class": [bem('security'), 'van-hairline--surround'],
    "on": {
      "touchstart": function touchstart(event) {
        event.stopPropagation();
        emit(ctx, 'focus', event);
      }
    }
  }, inherit(ctx, true)]), [Points]), info && h("div", {
    "class": bem(props.errorInfo ? 'error-info' : 'info')
  }, [info])]);
}

PasswordInput.props = {
  info: String,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: ''
  },
  length: {
    type: Number,
    default: 6
  }
};
export default sfc(PasswordInput);