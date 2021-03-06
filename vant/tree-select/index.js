import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon'; // Types

var _use = use('tree-select'),
    sfc = _use[0],
    bem = _use[1];

function TreeSelect(h, props, slots, ctx) {
  var height = props.height,
      items = props.items,
      mainActiveIndex = props.mainActiveIndex,
      activeId = props.activeId;
  var selectedItem = items[mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  return h("div", _mergeJSXProps([{
    "class": bem(),
    "style": {
      height: height + "px"
    }
  }, inherit(ctx)]), [h("div", {
    "class": bem('nav')
  }, [items.map(function (item, index) {
    return h("div", {
      "key": index,
      "class": ['van-ellipsis', bem('nitem', {
        active: mainActiveIndex === index,
        disabled: item.disabled
      })],
      "on": {
        "click": function click() {
          if (!item.disabled) {
            emit(ctx, 'navclick', index);
          }
        }
      }
    }, [item.text]);
  })]), h("div", {
    "class": bem('content')
  }, [subItems.map(function (item) {
    return h("div", {
      "key": item.id,
      "class": ['van-ellipsis', bem('item', {
        active: activeId === item.id,
        disabled: item.disabled
      })],
      "on": {
        "click": function click() {
          if (!item.disabled) {
            emit(ctx, 'itemclick', item);
          }
        }
      }
    }, [item.text, activeId === item.id && h(Icon, {
      "attrs": {
        "name": "checked",
        "size": "16px"
      },
      "class": bem('selected')
    })]);
  })])]);
}

TreeSelect.props = {
  items: Array,
  mainActiveIndex: Number,
  activeId: {
    type: [Number, String],
    default: 0
  },
  height: {
    type: Number,
    default: 300
  }
};
export default sfc(TreeSelect);