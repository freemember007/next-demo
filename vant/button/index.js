import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import { routeProps, functionalRoute } from '../utils/router';
import Loading from '../loading'; // Types

var _use = use('button'),
    sfc = _use[0],
    bem = _use[1];

function Button(h, props, slots, ctx) {
  var tag = props.tag,
      type = props.type,
      disabled = props.disabled,
      loading = props.loading,
      loadingText = props.loadingText;

  var onClick = function onClick(event) {
    if (!loading && !disabled) {
      emit(ctx, 'click', event);
      functionalRoute(ctx);
    }
  };

  return h(tag, _mergeJSXProps([{
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled
    },
    "class": bem([type, props.size, {
      loading: loading,
      disabled: disabled,
      block: props.block,
      plain: props.plain,
      round: props.round,
      square: props.square,
      'bottom-action': props.bottomAction
    }]),
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [loading ? [h(Loading, {
    "attrs": {
      "size": props.loadingSize,
      "color": type === 'default' ? undefined : ''
    }
  }), loadingText && h("span", {
    "class": bem('loading-text')
  }, [loadingText])] : h("span", {
    "class": bem('text')
  }, [slots.default ? slots.default() : props.text])]);
}

Button.props = _extends({}, routeProps, {
  text: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: String,
  loadingText: String,
  bottomAction: Boolean,
  tag: {
    type: String,
    default: 'button'
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'normal'
  },
  loadingSize: {
    type: String,
    default: '20px'
  }
});
export default sfc(Button);