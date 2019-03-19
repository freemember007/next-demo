import _extends from "@babel/runtime/helpers/esm/extends";
import Vue from 'vue';
import VanNotify from './Notify';
import { RED, WHITE } from '../utils/color';
import { isObj, isServer } from '../utils';
import { mount } from '../utils/functional';
var timer;
var instance;

function parseOptions(message) {
  return isObj(message) ? message : {
    message: message
  };
}

function Notify(options) {
  /* istanbul ignore if */
  if (isServer) {
    return;
  }

  if (!instance) {
    instance = mount(VanNotify);
  }

  options = _extends({}, Notify.currentOptions, parseOptions(options));

  _extends(instance, options);

  clearTimeout(timer);

  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }

  return instance;
}

function defaultOptions() {
  return {
    value: true,
    message: '',
    color: WHITE,
    background: RED,
    duration: 3000,
    className: ''
  };
}

Notify.clear = function () {
  if (instance) {
    instance.value = false;
  }
};

Notify.currentOptions = defaultOptions();

Notify.setDefaultOptions = function (options) {
  _extends(Notify.currentOptions, options);
};

Notify.resetDefaultOptions = function () {
  Notify.currentOptions = defaultOptions();
};

Notify.install = function () {
  Vue.use(VanNotify);
};

Vue.prototype.$notify = Notify;
export default Notify;