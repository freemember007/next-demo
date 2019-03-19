import _extends from "@babel/runtime/helpers/esm/extends";
import { use } from '../utils';
import Icon from '../icon';
import Info from '../info';
import { route, routeProps } from '../utils/router';

var _use = use('tabbar-item'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: _extends({}, routeProps, {
    icon: String,
    dot: Boolean,
    info: [String, Number]
  }),
  data: function data() {
    return {
      active: false
    };
  },
  beforeCreate: function beforeCreate() {
    this.$parent.items.push(this);
  },
  destroyed: function destroyed() {
    this.$parent.items.splice(this.$parent.items.indexOf(this), 1);
  },
  methods: {
    onClick: function onClick(event) {
      this.$parent.onChange(this.$parent.items.indexOf(this));
      this.$emit('click', event);
      route(this.$router, this);
    }
  },
  render: function render(h) {
    var icon = this.icon,
        slots = this.slots,
        active = this.active;
    var style = active ? {
      color: this.$parent.activeColor
    } : null;
    return h("div", {
      "class": bem({
        active: active
      }),
      "style": style,
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('icon', {
        dot: this.dot
      })
    }, [slots('icon', {
      active: active
    }) || icon && h(Icon, {
      "attrs": {
        "name": icon
      }
    }), h(Info, {
      "attrs": {
        "info": this.info
      }
    })]), h("div", {
      "class": bem('text')
    }, [slots('default', {
      active: active
    })])]);
  }
});