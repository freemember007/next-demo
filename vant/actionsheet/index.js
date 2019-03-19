import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import { PopupMixin } from '../mixins/popup';
import Icon from '../icon';
import Loading from '../loading';
import Popup from '../popup'; // Types

var _use = use('actionsheet'),
    sfc = _use[0],
    bem = _use[1];

function Actionsheet(h, props, slots, ctx) {
  var title = props.title,
      cancelText = props.cancelText;

  var onCancel = function onCancel() {
    emit(ctx, 'input', false);
    emit(ctx, 'cancel');
  };

  var Header = function Header() {
    return h("div", {
      "class": [bem('header'), 'van-hairline--top-bottom']
    }, [title, h(Icon, {
      "attrs": {
        "name": "close"
      },
      "class": bem('close'),
      "on": {
        "click": onCancel
      }
    })]);
  };

  var Option = function Option(item, index) {
    return h("div", {
      "class": [bem('item', {
        disabled: item.disabled || item.loading
      }), item.className, 'van-hairline--top'],
      "on": {
        "click": function click(event) {
          event.stopPropagation();

          if (!item.disabled && !item.loading) {
            if (item.callback) {
              item.callback(item);
            }

            emit(ctx, 'select', item, index);
          }
        }
      }
    }, [item.loading ? h(Loading, {
      "class": bem('loading'),
      "attrs": {
        "size": "20px"
      }
    }) : [h("span", {
      "class": bem('name')
    }, [item.name]), item.subname && h("span", {
      "class": bem('subname')
    }, [item.subname])]]);
  };

  var Footer = cancelText ? h("div", {
    "class": bem('cancel'),
    "on": {
      "click": onCancel
    }
  }, [cancelText]) : h("div", {
    "class": bem('content')
  }, [slots.default && slots.default()]);
  return h(Popup, _mergeJSXProps([{
    "class": bem(),
    "attrs": {
      "value": props.value,
      "position": "bottom",
      "overlay": props.overlay,
      "lazyRender": props.lazyRender,
      "getContainer": props.getContainer,
      "closeOnClickOverlay": props.closeOnClickOverlay
    },
    "on": {
      "input": function input(value) {
        emit(ctx, 'input', value);
      }
    }
  }, inherit(ctx)]), [title ? Header() : props.actions.map(Option), Footer]);
}

Actionsheet.props = _extends({}, PopupMixin.props, {
  title: String,
  actions: Array,
  cancelText: String,
  overlay: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
});
export default sfc(Actionsheet);