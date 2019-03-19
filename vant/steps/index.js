import { use } from '../utils';
import { GREEN } from '../utils/color';
import Icon from '../icon';

var _use = use('steps'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    icon: String,
    title: String,
    active: Number,
    iconClass: String,
    description: String,
    direction: {
      type: String,
      default: 'horizontal'
    },
    activeColor: {
      type: String,
      default: GREEN
    },
    activeIcon: {
      type: String,
      default: 'checked'
    }
  },
  data: function data() {
    return {
      steps: []
    };
  },
  render: function render(h) {
    var icon = this.icon,
        title = this.title,
        description = this.description,
        slots = this.slots;
    var StatusIcon = (slots('icon') || icon) && h("div", {
      "class": bem('icon')
    }, [slots('icon') || h(Icon, {
      "attrs": {
        "name": icon
      },
      "class": this.iconClass
    })]);
    var StatusMessage = h("div", {
      "class": bem('message')
    }, [h("div", {
      "class": bem('title')
    }, [title]), h("div", {
      "class": [bem('desc'), 'van-ellipsis']
    }, [description])]);
    return h("div", {
      "class": bem([this.direction])
    }, [(title || description) && h("div", {
      "class": bem('status')
    }, [StatusIcon, StatusMessage, slots('message-extra')]), h("div", {
      "class": bem('items', {
        alone: !title && !description
      })
    }, [slots()])]);
  }
});