import { on, off } from '../utils/event';
export var ClickOutsideMixin = function ClickOutsideMixin(config) {
  return {
    mounted: function mounted() {
      var _this = this;

      config.handler = function (event) {
        if (!_this.$el.contains(event.target)) {
          _this[config.method]();
        }
      };

      on(document, config.event, config.handler);
    },
    beforeDestroy: function beforeDestroy() {
      off(document, config.event, config.handler);
    }
  };
};