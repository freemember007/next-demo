import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import Loading from '../loading';
import { switchProps } from './shared';
import { emit, inherit } from '../utils/functional'; // Types

var _use = use('switch'),
    sfc = _use[0],
    bem = _use[1];

function Switch(h, props, slots, ctx) {
  var value = props.value,
      loading = props.loading,
      disabled = props.disabled,
      activeValue = props.activeValue,
      inactiveValue = props.inactiveValue;
  var style = {
    fontSize: props.size,
    backgroundColor: value ? props.activeColor : props.inactiveColor
  };

  var onClick = function onClick() {
    if (!disabled && !loading) {
      var newValue = value === activeValue ? inactiveValue : activeValue;
      emit(ctx, 'input', newValue);
      emit(ctx, 'change', newValue);
    }
  };

  return h("div", _mergeJSXProps([{
    "class": bem({
      on: value === activeValue,
      disabled: disabled
    }),
    "style": style,
    "on": {
      "click": onClick
    }
  }, inherit(ctx)]), [h("div", {
    "class": bem('node')
  }, [loading && h(Loading, {
    "class": bem('loading')
  })])]);
}

Switch.props = switchProps;
export default sfc(Switch);