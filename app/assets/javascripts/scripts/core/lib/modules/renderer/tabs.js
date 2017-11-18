/**
 * Created by teamco on 7/10/14.
 */
defineP(function defineTabsRenderer() {

  /**
   * Define TabsRenderer
   * @class TabsRenderer
   * @extends AntHill
   * @constructor
   */
  var TabsRenderer = function TabsRenderer() {
  };

  return TabsRenderer.extend('TabsRenderer', {

    /**
     * General class names
     * @memberOf TabsRenderer
     * @type {Object}
     */
    scrollerClass: {
      name: 'scroller',
      left: 'left',
      right: 'right'
    },

    /**
     * Get scroller side class name
     * @param {string} side
     * @memberOf TabsRenderer
     * @returns {string}
     */
    getScrollerSideClassName: function getScrollerSideClassName(side) {
      return [this.scrollerClass.name, side].join('-');
    },

    /**
     * Get scroller class name
     * @param {string} side
     * @memberOf TabsRenderer
     * @returns {string}
     */
    getScrollerClassName: function getScrollerClassName(side) {
      return [
        this.scrollerClass.name,
        this.getScrollerSideClassName(side)
      ].join(' ');
    },

    /**
     * Render scroller
     * @memberOf TabsRenderer
     * @returns {string}
     */
    renderScroller: function renderScroller() {
      return [
        '<div class="', this.getScrollerClassName('left'), '">',
        '<i class="glyphicon glyphicon-chevron-left"></i></div>',
        '<div class="', this.getScrollerClassName('right'), '">',
        '<i class="glyphicon glyphicon-chevron-right"></i></div>'
      ].join('');
    },

    /**
     * Get scroller side jQuery element
     * @memberOf TabsRenderer
     * @returns {*|jQuery}
     */
    get$scroller: function get$scroller($container, side) {
      return $('.' + this.getScrollerSideClassName(side), $container);
    },

    /**
     * Render Tabs
     * @memberOf TabsRenderer
     * @returns {*|jQuery}
     */
    renderTabs: function renderTabs() {
      return $('<div class="tabs-wrapper" />').append(
          this.renderScroller(),
          '<ul class="nav nav-tabs" role="tablist" />'
      );
    },

    /**
     * Render Tabs content
     * @memberOf TabsRenderer
     * @returns {*|jQuery}
     */
    renderTabItemsContent: function renderTabItemContent() {
      return $('<div class="tab-content" />');
    },

    /**
     * Add tab item content
     * @memberOf TabsRenderer
     * @param {string} uuid
     * @param content
     * @param {boolean} [active]
     * @returns {*|jQuery}
     */
    addTabItemContent: function addTabItemContent(uuid, content, active) {

      var $item = $('<div role="tabpanel" class="tab-pane" />');

      $item.attr({
        id: uuid,
        'aria-labelledby': uuid + '-tab'
      });

      if (active) {
        $item.addClass('active');
      }

      return $item.append(content);
    },

    /**
     * Render Tab item
     * @memberOf TabsRenderer
     * @param $tabs
     * @param {{uuid, $container, text, content, dataToggle}} item
     * @param {boolean} [active]
     */
    addTabItem: function addTabItem($tabs, item, active) {

      var $item = $('<li role="presentation"><a href="#"></a></li>'),
          uuid = this.base.lib.generator.UUID(item.uuid);

      $item.find('a').text(item.text).attr({
        href: '#' + uuid,
        id: uuid + '-tab',
        'data-toggle': item.dataToggle || 'tab'
      });

      $tabs.find('ul').append($item);

      item.$container.append(
          this.addTabItemContent(uuid, item.content, active)
      );

      if (active) {
        $item.addClass('active');
      }
    },

    /**
     * Get tabs left position
     * @memberOf TabsRenderer
     * @param $container
     * @returns {number}
     */
    getTabsLeftPos: function getTabsLeftPos($container) {
      return $('.nav-tabs', $container).position().left;
    },

    /**
     * Re-adjust tabs
     * @memberOf TabsRenderer
     * @param $container
     */
    reAdjustTabs: function reAdjustTabs($container) {

      /**
       * Get element
       * @type {TabsRenderer}
       */
      var element = this;

      var $left = this.get$scroller($container, 'left'),
          $right = this.get$scroller($container, 'right'),
          width = $container.outerWidth(),
          leftOffset = element.getTabsLeftPos($container);

      var leftFade = leftOffset < 0,
          $rightLast = $('ul li[role="presentation"]:last', $container),
          rightFade = Math.abs(leftOffset) + width <
              $rightLast.outerWidth() + $rightLast.position().left;

      $right.stop()[(rightFade ? 'show' : 'hide')]();
      $left.stop()[(leftFade ? 'show' : 'hide')]();
    },

    /**
     * Bin scroll
     * @memberOf TabsRenderer
     * @param $container
     * @returns {boolean}
     */
    bindTabsScroll: function bindTabsScroll($container) {

      /**
       * Get element
       * @type {TabsRenderer}
       */
      var element = this;

      var $left = this.get$scroller($container, 'left'),
          $right = this.get$scroller($container, 'right');

      if (!$left.length) {
        return false;
      }

      var $tabs = $('.nav-tabs', $container);

      $left.off().on('click.left', function _scrollLeft(e) {
        element.scrollToTab(
            element.scrollTabsLeft($tabs),
            $tabs, 0, e
        );
      });

      $right.off().on('click.right', function _scrollRight(e) {
        element.scrollToTab(
            element.scrollTabsRight($tabs, this),
            $tabs, 1, e
        );
      });

      element.reAdjustTabs($container.find('.tabs-wrapper'));
    },

    /**
     * Scroll tab
     * @memberOf TabsRenderer
     * @param {number} delta
     * @param $tabs
     * @param {number} side
     * @param {Event} event
     */
    scrollToTab: function scrollToTab(delta, $tabs, side, event) {

      /**
       * Get element
       * @type {TabsRenderer}
       */
      var element = this,
          $pt = $tabs.parent();

      if (delta) {
        element.reAdjustTabs($pt);
        $tabs.stop().animate(
            {left: (side ? '-' : '+') + '=' + delta + 'px'},
            function _afterAnimate() {
              element.reAdjustTabs($pt);
            }
        );
      }
    },

    /**
     * Scroll left
     * @memberOf TabsRenderer
     * @param $tabs
     * @param scroller
     * @returns {number}
     */
    scrollTabsLeft: function scrollTabsLeft($tabs) {
      return Math.abs($tabs.position().left);
    },

    /**
     * Scroll right
     * @memberOf TabsRenderer
     * @param $tabs
     * @param scroller
     * @returns {*}
     */
    scrollTabsRight: function scrollTabsRight($tabs, scroller) {
      var width = $tabs.outerWidth(), $tab, delta,
          $lis = $('li', $tabs), i = 0, l = $lis.length;
      for (; i < l; i++) {
        $tab = $lis[i];
        delta = $($tab).position().left + $tab.getBoundingClientRect().width -
            Math.abs(this.getTabsLeftPos()) - width;
        if (delta > 0) return delta + scroller.getBoundingClientRect().width;
      }
    }
  });
});