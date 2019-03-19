import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

/* eslint-disable prefer-spread */
import { use } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon'; // Types

var _use = use('rate'),
    sfc = _use[0],
    bem = _use[1];

function Rate(h, props, slots, ctx) {
  var list = [];

  for (var i = 0; i < props.count; i++) {
    list.push(i < props.value);
  }

  var onSelect = function onSelect(index) {
    if (!props.disabled && !props.readonly) {
      emit(ctx, 'input', index + 1);
      emit(ctx, 'change', index + 1);
    }
  };

  var onTouchMove = function onTouchMove(event) {
    if (!document.elementFromPoint) {
      return;
    }

    event.preventDefault();
    var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
    var target = document.elementFromPoint(clientX, clientY);

    if (target && target.dataset) {
      var _index = target.dataset.index;
      /* istanbul ignore else */

      if (_index) {
        onSelect(+_index);
      }
    }
  };

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx), {
    "on": {
      "touchmove": onTouchMove
    }
  }]), [list.map(function (full, index) {
    return h(Icon, {
      "key": index,
      "class": bem('item'),
      "attrs": {
        "size": props.size + "px",
        "data-index": index,
        "name": full ? props.icon : props.voidIcon,
        "color": props.disabled ? props.disabledColor : full ? props.color : props.voidColor
      },
      "on": {
        "click": function click() {
          onSelect(index);
        }
      }
    });
  })]);
}

Rate.props = {
  value: Number,
  readonly: Boolean,
  disabled: Boolean,
  size: {
    type: Number,
    default: 20
  },
  icon: {
    type: String,
    default: 'star'
  },
  voidIcon: {
    type: String,
    default: 'star-o'
  },
  color: {
    type: String,
    default: '#ffd21e'
  },
  voidColor: {
    type: String,
    default: '#c7c7c7'
  },
  disabledColor: {
    type: String,
    default: '#bdbdbd'
  },
  count: {
    type: Number,
    default: 5
  }
};
export default sfc(Rate);