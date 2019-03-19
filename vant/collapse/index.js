import { use } from '../utils';

var _use = use('collapse'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      items: []
    };
  },
  methods: {
    switch: function _switch(name, expanded) {
      if (!this.accordion) {
        name = expanded ? this.value.concat(name) : this.value.filter(function (activeName) {
          return activeName !== name;
        });
      }

      this.$emit('change', name);
      this.$emit('input', name);
    }
  },
  render: function render(h) {
    return h("div", {
      "class": [bem(), {
        'van-hairline--top-bottom': this.border
      }]
    }, [this.slots()]);
  }
});