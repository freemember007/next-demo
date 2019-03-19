import { use, isDef } from '../utils';
import { PopupMixin } from '../mixins/popup';
import Icon from '../icon';
import Loading from '../loading';

var _use = use('toast'),
    sfc = _use[0],
    bem = _use[1];

var STYLE = ['success', 'fail', 'loading'];
export default sfc({
  mixins: [PopupMixin],
  props: {
    className: null,
    forbidClick: Boolean,
    message: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    loadingType: {
      type: String,
      default: 'circular'
    },
    position: {
      type: String,
      default: 'middle'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      clickable: false
    };
  },
  mounted: function mounted() {
    this.toggleClickale();
  },
  destroyed: function destroyed() {
    this.toggleClickale();
  },
  watch: {
    value: function value() {
      this.toggleClickale();
    },
    forbidClick: function forbidClick() {
      this.toggleClickale();
    }
  },
  methods: {
    toggleClickale: function toggleClickale() {
      var clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        var action = clickable ? 'add' : 'remove';
        document.body.classList[action]('van-toast--unclickable');
      }
    }
  },
  render: function render(h) {
    var _this = this;

    var type = this.type,
        message = this.message;
    var style = STYLE.indexOf(type) !== -1 ? 'default' : type;

    var Content = function Content() {
      switch (style) {
        case 'text':
          return h("div", [message]);

        case 'html':
          return h("div", {
            "domProps": {
              "innerHTML": message
            }
          });

        default:
          return [type === 'loading' ? h(Loading, {
            "attrs": {
              "color": "white",
              "type": _this.loadingType
            }
          }) : h(Icon, {
            "class": bem('icon'),
            "attrs": {
              "name": type
            }
          }), isDef(message) && h("div", {
            "class": bem('text')
          }, [message])];
      }
    };

    return h("transition", {
      "attrs": {
        "name": "van-fade"
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [bem([style, this.position]), this.className]
    }, [Content()])]);
  }
});