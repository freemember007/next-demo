import { use } from '../utils';
import { stop } from '../utils/event';
import Key from './Key';

var _use = use('number-keyboard'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var CLOSE_KEY_TYPE = ['blue', 'big'];
var DELETE_KEY_TYPE = ['delete', 'big', 'gray'];
export default sfc({
  props: {
    show: Boolean,
    title: String,
    closeButtonText: String,
    deleteButtonText: String,
    theme: {
      type: String,
      default: 'default'
    },
    extraKey: {
      type: String,
      default: ''
    },
    zIndex: {
      type: Number,
      default: 100
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted() {
    this.handler(true);
  },
  destroyed: function destroyed() {
    this.handler(false);
  },
  activated: function activated() {
    this.handler(true);
  },
  deactivated: function deactivated() {
    this.handler(false);
  },
  watch: {
    show: function show() {
      if (!this.transition) {
        this.$emit(this.show ? 'show' : 'hide');
      }
    }
  },
  computed: {
    keys: function keys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i
        });
      }

      switch (this.theme) {
        case 'default':
          keys.push({
            text: this.extraKey,
            type: ['gray']
          }, {
            text: 0
          }, {
            text: this.deleteText,
            type: ['gray', 'delete']
          });
          break;

        case 'custom':
          keys.push({
            text: 0,
            type: ['middle']
          }, {
            text: this.extraKey
          });
          break;
      }

      return keys;
    },
    deleteText: function deleteText() {
      return this.deleteButtonText || t('delete');
    }
  },
  methods: {
    handler: function handler(action) {
      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (action !== this.handlerStatus && this.hideOnClickOutside) {
        this.handlerStatus = action;
        document.body[(action ? 'add' : 'remove') + 'EventListener']('touchstart', this.onBlur);
      }
    },
    onBlur: function onBlur() {
      this.$emit('blur');
    },
    onClose: function onClose() {
      this.$emit('close');
      this.onBlur();
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onPress: function onPress(text) {
      if (text === '') {
        return;
      }

      if (text === this.deleteText) {
        this.$emit('delete');
      } else if (text === this.closeButtonText) {
        this.onClose();
      } else {
        this.$emit('input', text);
      }
    }
  },
  render: function render(h) {
    var theme = this.theme,
        onPress = this.onPress,
        closeButtonText = this.closeButtonText;
    var showTitleClose = closeButtonText && theme === 'default';
    return h("transition", {
      "attrs": {
        "name": this.transition ? 'van-slide-up' : ''
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.show
      }],
      "style": {
        zIndex: this.zIndex
      },
      "class": bem([theme]),
      "on": {
        "touchstart": stop,
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [(this.title || showTitleClose) && h("div", {
      "class": [bem('title'), 'van-hairline--top']
    }, [h("span", [this.title]), showTitleClose && h("span", {
      "class": bem('close'),
      "on": {
        "click": this.onClose
      }
    }, [closeButtonText])]), h("div", {
      "class": bem('body')
    }, [this.keys.map(function (key) {
      return h(Key, {
        "key": key.text,
        "attrs": {
          "text": key.text,
          "type": key.type
        },
        "on": {
          "press": onPress
        }
      });
    })]), theme === 'custom' && h("div", {
      "class": bem('sidebar')
    }, [h(Key, {
      "attrs": {
        "text": this.deleteText,
        "type": DELETE_KEY_TYPE
      },
      "on": {
        "press": onPress
      }
    }), h(Key, {
      "attrs": {
        "text": closeButtonText,
        "type": CLOSE_KEY_TYPE
      },
      "on": {
        "press": onPress
      }
    })])])]);
  }
});