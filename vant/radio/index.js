import { use } from '../utils';
import { CheckboxMixin } from '../mixins/checkbox';

var _use = use('radio'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [CheckboxMixin('van-radio-group', bem)],
  computed: {
    currentValue: {
      get: function get() {
        return this.parent ? this.parent.value : this.value;
      },
      set: function set(val) {
        (this.parent || this).$emit('input', val);
      }
    },
    checked: function checked() {
      return this.currentValue === this.name;
    }
  },
  methods: {
    onClickIcon: function onClickIcon() {
      if (!this.isDisabled) {
        this.currentValue = this.name;
      }
    },
    onClickLabel: function onClickLabel() {
      if (!this.isDisabled && !this.labelDisabled) {
        this.currentValue = this.name;
      }
    }
  }
});