import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Button from '../button'; // Types

var _use = use('submit-bar'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function SubmitBar(h, props, slots, ctx) {
  var tip = props.tip,
      price = props.price;
  var hasPrice = typeof price === 'number';
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [slots.top && slots.top(), (slots.tip || tip) && h("div", {
    "class": bem('tip')
  }, [tip, slots.tip && slots.tip()]), h("div", {
    "class": bem('bar')
  }, [slots.default && slots.default(), h("div", {
    "class": bem('text')
  }, [hasPrice && [h("span", [props.label || t('label')]), h("span", {
    "class": bem('price')
  }, [props.currency + " " + (price / 100).toFixed(2)])]]), h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": props.buttonType,
      "loading": props.loading,
      "disabled": props.disabled,
      "text": props.loading ? '' : props.buttonText
    },
    "on": {
      "click": function click() {
        emit(ctx, 'submit');
      }
    }
  })])]);
}

SubmitBar.props = {
  tip: String,
  label: String,
  loading: Boolean,
  disabled: Boolean,
  buttonText: String,
  price: {
    type: Number,
    default: null
  },
  currency: {
    type: String,
    default: '¥'
  },
  buttonType: {
    type: String,
    default: 'danger'
  }
};
export default sfc(SubmitBar);