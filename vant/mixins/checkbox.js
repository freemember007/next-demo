/**
 * Common part of Checkbox & Radio
 */
import Icon from '../icon';
import { FindParentMixin } from './find-parent';
export var CheckboxMixin = function CheckboxMixin(parent, bem) {
  return {
    mixins: [FindParentMixin],
    props: {
      name: null,
      value: null,
      disabled: Boolean,
      checkedColor: String,
      labelPosition: String,
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: 'round'
      }
    },
    created: function created() {
      this.findParent(parent);
    },
    computed: {
      isDisabled: function isDisabled() {
        return this.parent && this.parent.disabled || this.disabled;
      },
      iconStyle: function iconStyle() {
        var checkedColor = this.checkedColor;

        if (checkedColor && this.checked && !this.isDisabled) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor
          };
        }
      }
    },
    render: function render(h) {
      var _this = this;

      var slots = this.slots,
          checked = this.checked;
      var CheckIcon = slots('icon', {
        checked: checked
      }) || h(Icon, {
        "attrs": {
          "name": "success"
        },
        "style": this.iconStyle
      });
      var Label = slots() && h("span", {
        "class": bem('label', [this.labelPosition, {
          disabled: this.isDisabled
        }]),
        "on": {
          "click": this.onClickLabel
        }
      }, [slots()]);
      return h("div", {
        "class": bem(),
        "on": {
          "click": function click() {
            _this.$emit('click');
          }
        }
      }, [h("div", {
        "class": bem('icon', [this.shape, {
          disabled: this.isDisabled,
          checked: checked
        }]),
        "on": {
          "click": function click(event) {
            event.stopPropagation();

            _this.onClickIcon();
          }
        }
      }, [CheckIcon]), Label]);
    }
  };
};