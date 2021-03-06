import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio'; // Types

var _use = use('address-item'),
    sfc = _use[0],
    bem = _use[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
      switchable = props.switchable;

  var renderRightIcon = function renderRightIcon() {
    return h(Icon, {
      "attrs": {
        "name": "edit"
      },
      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          emit(ctx, 'edit');
        }
      }
    });
  };

  var renderContent = function renderContent() {
    var data = props.data;
    var Info = [h("div", {
      "class": bem('name')
    }, [data.name + "\uFF0C" + data.tel]), h("div", {
      "class": bem('address')
    }, [data.address])];
    return props.switchable ? h(Radio, {
      "attrs": {
        "name": data.id
      }
    }, [Info]) : Info;
  };

  var onSelect = function onSelect() {
    if (props.switchable) {
      emit(ctx, 'select');
    }
  };

  return h(Cell, _mergeJSXProps([{
    "class": bem({
      disabled: disabled,
      unswitchable: !switchable
    }),
    "attrs": {
      "valueClass": bem('value'),
      "isLink": !disabled && switchable
    },
    "scopedSlots": {
      default: renderContent,
      'right-icon': renderRightIcon
    },
    "on": {
      "click": onSelect
    }
  }, inherit(ctx)]));
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean
};
export default sfc(AddressItem);