import { use } from '../utils';

var _use = use('pagination'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function makePage(number, text, active) {
  return {
    number: number,
    text: text,
    active: active
  };
}

export default sfc({
  props: {
    value: Number,
    prevText: String,
    nextText: String,
    pageCount: Number,
    totalItems: Number,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi'
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    showPageSize: {
      type: Number,
      default: 5
    }
  },
  computed: {
    count: function count() {
      var count = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count);
    },
    pages: function pages() {
      var pages = [];
      var pageCount = this.count;

      if (this.mode !== 'multi') {
        return pages;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = this.showPageSize !== undefined && this.showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(this.value - Math.floor(this.showPageSize / 2), 1);
        endPage = startPage + this.showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - this.showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === this.value);
        pages.push(page);
      } // Add links to move between page sets


      if (isMaxSized && this.showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          var previousPageSet = makePage(startPage - 1, '...', false);
          pages.unshift(previousPageSet);
        }

        if (endPage < pageCount) {
          var nextPageSet = makePage(endPage + 1, '...', false);
          pages.push(nextPageSet);
        }
      }

      return pages;
    }
  },
  watch: {
    value: {
      handler: function handler(page) {
        this.select(page || this.value);
      },
      immediate: true
    }
  },
  methods: {
    select: function select(page) {
      page = Math.min(this.count, Math.max(1, page));

      if (this.value !== page) {
        this.$emit('input', page);
        this.$emit('change', page);
      }
    }
  },
  render: function render(h) {
    var _this = this;

    var value = this.value;
    var simple = this.mode !== 'multi';

    var onSelect = function onSelect(value) {
      return function () {
        _this.select(value);
      };
    };

    return h("ul", {
      "class": bem({
        simple: simple
      })
    }, [h("li", {
      "class": [bem('item', {
        disabled: value === 1
      }), bem('prev'), 'van-hairline'],
      "on": {
        "click": onSelect(value - 1)
      }
    }, [this.prevText || t('prev')]), this.pages.map(function (page) {
      return h("li", {
        "class": [bem('item', {
          active: page.active
        }), bem('page'), 'van-hairline'],
        "on": {
          "click": onSelect(page.number)
        }
      }, [page.text]);
    }), simple && h("li", {
      "class": bem('page-desc')
    }, [this.slots('pageDesc') || value + "/" + this.count]), h("li", {
      "class": [bem('item', {
        disabled: value === this.count
      }), bem('next'), 'van-hairline'],
      "on": {
        "click": onSelect(value + 1)
      }
    }, [this.nextText || t('next')])]);
  }
});