/* eslint-disable object-shorthand */
import { use } from '../utils';
import { FindParentMixin } from '../mixins/find-parent';

var _use = use('tab'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [FindParentMixin],
  props: {
    title: String,
    disabled: Boolean
  },
  data: function data() {
    return {
      inited: false
    };
  },
  computed: {
    index: function index() {
      return this.parent.tabs.indexOf(this);
    },
    selected: function selected() {
      return this.index === this.parent.curActive;
    }
  },
  watch: {
    'parent.curActive': function parentCurActive() {
      this.inited = this.inited || this.selected;
    },
    title: function title() {
      this.parent.setLine();
    }
  },
  created: function created() {
    this.findParent('van-tabs');
  },
  mounted: function mounted() {
    var tabs = this.parent.tabs;
    var index = this.parent.slots().indexOf(this.$vnode);
    tabs.splice(index === -1 ? tabs.length : index, 0, this);

    if (this.slots('title')) {
      this.parent.renderTitle(this.$refs.title, this.index);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.tabs.splice(this.index, 1);
  },
  render: function render(h) {
    var slots = this.slots;
    var shouldRender = this.inited || !this.parent.lazyRender;
    return h("div", {
      "directives": [{
        name: "show",
        value: this.selected || this.parent.animated
      }],
      "class": bem('pane')
    }, [shouldRender ? slots() : h(), slots('title') && h("div", {
      "ref": "title"
    }, [slots('title')])]);
  }
});