import { use } from '../utils';

var _use = use('tabbar'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  data: function data() {
    return {
      items: []
    };
  },
  props: {
    value: Number,
    activeColor: String,
    fixed: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  watch: {
    items: function items() {
      this.setActiveItem();
    },
    value: function value() {
      this.setActiveItem();
    }
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this = this;

      this.items.forEach(function (item, index) {
        item.active = index === _this.value;
      });
    },
    onChange: function onChange(active) {
      if (active !== this.value) {
        this.$emit('input', active);
        this.$emit('change', active);
      }
    }
  },
  render: function render(h) {
    return h("div", {
      "style": {
        zIndex: this.zIndex
      },
      "class": ['van-hairline--top-bottom', bem({
        fixed: this.fixed
      })]
    }, [this.slots()]);
  }
});