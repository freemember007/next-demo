import { use } from '../utils';
import Checkbox from '../checkbox';

var _use = use('coupon'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function padZero(num) {
  return (num < 10 ? '0' : '') + num;
}

function getDate(timeStamp) {
  var date = new Date(timeStamp * 1000);
  return date.getFullYear() + "." + padZero(date.getMonth() + 1) + "." + padZero(date.getDate());
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}

export default sfc({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: '¥'
    }
  },
  computed: {
    validPeriod: function validPeriod() {
      return t('valid') + "\uFF1A" + getDate(this.coupon.startAt) + " - " + getDate(this.coupon.endAt);
    },
    faceAmount: function faceAmount() {
      var coupon = this.coupon;

      if (coupon.valueDesc) {
        return coupon.valueDesc + "<span>" + coupon.unitDesc + "</span>";
      }

      return coupon.denominations ? "<span>" + this.currency + "</span> " + formatAmount(this.coupon.denominations) : coupon.discount ? t('discount', formatDiscount(this.coupon.discount)) : '';
    },
    conditionMessage: function conditionMessage() {
      var condition = this.coupon.originCondition;
      condition = condition % 100 === 0 ? Math.round(condition / 100) : (condition / 100).toFixed(2);
      return condition === 0 ? t('unlimited') : t('condition', condition);
    }
  },
  render: function render(h) {
    var coupon = this.coupon,
        disabled = this.disabled;
    var description = disabled && coupon.reason || coupon.description;
    return h("div", {
      "class": bem({
        disabled: disabled
      })
    }, [h("div", {
      "class": bem('content')
    }, [h("div", {
      "class": bem('head')
    }, [h("h2", {
      "domProps": {
        "innerHTML": this.faceAmount
      }
    }), h("p", [this.coupon.condition || this.conditionMessage])]), h("div", {
      "class": bem('body')
    }, [h("h2", [coupon.name]), h("p", [this.validPeriod]), this.chosen && h(Checkbox, {
      "attrs": {
        "value": true
      },
      "class": bem('corner')
    })])]), description && h("p", {
      "class": bem('description')
    }, [description])]);
  }
});