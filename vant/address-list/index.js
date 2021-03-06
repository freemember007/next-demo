import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Button from '../button';
import RadioGroup from '../radio-group';
import AddressItem from './Item'; // Types

var _use = use('address-list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function AddressList(h, props, slots, ctx) {
  var getList = function getList(list, disabled) {
    return list.map(function (item, index) {
      return h(AddressItem, {
        "attrs": {
          "data": item,
          "disabled": disabled,
          "switchable": props.switchable && !disabled
        },
        "key": item.id,
        "on": {
          "select": function select() {
            emit(ctx, disabled ? 'select-disabled' : 'select', item, index);
          },
          "edit": function edit() {
            emit(ctx, disabled ? 'edit-disabled' : 'edit', item, index);
          }
        }
      });
    });
  };

  var List = getList(props.list);
  var DisabledList = getList(props.disabledList, true);
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [slots.top && slots.top(), h(RadioGroup, {
    "attrs": {
      "value": props.value
    },
    "on": {
      "input": function input(event) {
        emit(ctx, 'input', event);
      }
    }
  }, [List]), props.disabledText && h("div", {
    "class": bem('disabled-text')
  }, [props.disabledText]), DisabledList, slots.default && slots.default(), h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.addButtonText || t('add')
    },
    "class": bem('add'),
    "on": {
      "click": function click() {
        emit(ctx, 'add');
      }
    }
  })]);
}

AddressList.props = {
  list: Array,
  disabledList: Array,
  disabledText: String,
  addButtonText: String,
  value: [String, Number],
  switchable: {
    type: Boolean,
    default: true
  }
};
export default sfc(AddressList);