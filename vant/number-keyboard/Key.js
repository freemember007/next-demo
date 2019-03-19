import { use } from '../utils';

var _use = use('key'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    type: Array,
    text: [String, Number]
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    className: function className() {
      var types = this.type.slice(0);
      this.active && types.push('active');
      return bem(types);
    }
  },
  methods: {
    onFocus: function onFocus() {
      this.active = true;
      this.$emit('press', this.text);
    },
    onBlur: function onBlur(event) {
      event.preventDefault();
      event.stopPropagation();
      this.active = false;
    }
  },
  render: function render(h) {
    var onBlur = this.onBlur;
    return h("i", {
      "class": ['van-hairline', this.className],
      "on": {
        "touchstart": this.onFocus,
        "touchmove": onBlur,
        "touchend": onBlur,
        "touchcancel": onBlur
      }
    }, [this.text]);
  }
});