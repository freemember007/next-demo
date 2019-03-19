import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use, isDef } from '../utils';
import { inherit } from '../utils/functional';
import Tag from '../tag'; // Types

var _use = use('card'),
    sfc = _use[0],
    bem = _use[1];

function Card(h, props, slots, ctx) {
  var thumb = props.thumb;
  var showThumb = slots.thumb || thumb;
  var showTag = slots.tag || props.tag;
  var showNum = slots.num || isDef(props.num);
  var showPrice = slots.price || isDef(props.price);
  var showOriginPrice = slots['origin-price'] || isDef(props.originPrice);
  var Thumb = showThumb && h("a", {
    "attrs": {
      "href": props.thumbLink
    },
    "class": bem('thumb')
  }, [slots.thumb ? slots.thumb() : props.lazyLoad ? h("img", {
    "class": bem('img'),
    "directives": [{
      name: "lazy",
      value: thumb
    }]
  }) : h("img", {
    "class": bem('img'),
    "attrs": {
      "src": thumb
    }
  }), showTag && h("div", {
    "class": bem('tag')
  }, [slots.tag ? slots.tag() : h(Tag, {
    "attrs": {
      "mark": true,
      "type": "danger"
    }
  }, [props.tag])])]);
  var Title = slots.title ? slots.title() : props.title && h("div", {
    "class": bem('title')
  }, [props.title]);
  var Desc = slots.desc ? slots.desc() : props.desc && h("div", {
    "class": [bem('desc'), 'van-ellipsis']
  }, [props.desc]);
  var Price = showPrice && h("div", {
    "class": bem('price')
  }, [slots.price ? slots.price() : props.currency + " " + props.price]);
  var OriginPrice = showOriginPrice && h("div", {
    "class": bem('origin-price')
  }, [slots['origin-price'] ? slots['origin-price']() : props.currency + " " + props.originPrice]);
  var Num = showNum && h("div", {
    "class": bem('num')
  }, [slots.num ? slots.num() : "x " + props.num]);
  var Footer = slots.footer && h("div", {
    "class": bem('footer')
  }, [slots.footer()]);
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx, true)]), [h("div", {
    "class": bem('header')
  }, [Thumb, h("div", {
    "class": bem('content', {
      centered: props.centered
    })
  }, [Title, Desc, slots.tags && slots.tags(), h("div", {
    "class": "van-card__bottom"
  }, [Price, OriginPrice, Num])])]), Footer]);
}

Card.props = {
  tag: String,
  desc: String,
  thumb: String,
  title: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  num: [Number, String],
  price: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥'
  }
};
export default sfc(Card);