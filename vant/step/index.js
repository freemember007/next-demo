import { use } from '../utils';
import Icon from '../icon';

var _use = use('step'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  beforeCreate: function beforeCreate() {
    this.$parent.steps.push(this);
  },
  computed: {
    status: function status() {
      var index = this.$parent.steps.indexOf(this);
      var active = this.$parent.active;

      if (index < active) {
        return 'finish';
      }

      if (index === active) {
        return 'process';
      }
    }
  },
  render: function render(h) {
    var _ref;

    var status = this.status;
    var _this$$parent = this.$parent,
        activeIcon = _this$$parent.activeIcon,
        activeColor = _this$$parent.activeColor,
        direction = _this$$parent.direction;
    var titleStyle = status === 'process' && {
      color: activeColor
    };
    return h("div", {
      "class": ['van-hairline', bem([direction, (_ref = {}, _ref[status] = status, _ref)])]
    }, [h("div", {
      "class": bem('title'),
      "style": titleStyle
    }, [this.slots()]), h("div", {
      "class": bem('circle-container')
    }, [status !== 'process' ? h("i", {
      "class": bem('circle')
    }) : h(Icon, {
      "attrs": {
        "name": activeIcon
      },
      "style": {
        color: activeColor
      }
    })]), h("div", {
      "class": bem('line')
    })]);
  }
});