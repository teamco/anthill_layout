/**
 * Created by teamco on 7/10/14.
 */

import {LibGenerator} from 'js/modules/base/Generator';

/**
 * @class TabsRenderer
 * @type {TabsRenderer}
 */
export class TabsRenderer {

  /**
   * Get scroller side class name
   * @param {string} side
   * @memberOf TabsRenderer
   * @returns {string}
   */
  getScrollerSideClassName(side) {
    return ['scroller', side].join('-');
  }

  /**
   * Get scroller class name
   * @param {string} side
   * @memberOf TabsRenderer
   * @returns {string}
   */
  getScrollerClassName(side) {
    return ['scroller', this.getScrollerSideClassName(side)].join(' ');
  }

  /**
   * Render scroller
   * @memberOf TabsRenderer
   * @returns {string}
   */
  renderScroller() {
    return `<div class="${this.getScrollerClassName('left')}">
              <i class="glyphicon glyphicon-chevron-left"></i>
            </div>
            <div class="${this.getScrollerClassName('right')}">
              <i class="glyphicon glyphicon-chevron-right"></i>
            </div>`;
  }

  /**
   * Get scroller side jQuery element
   * @memberOf TabsRenderer
   * @returns {*|jQuery}
   */
  get$scroller($container, side) {
    return window.$(`.${this.getScrollerSideClassName(side)}`, $container);
  }

  /**
   * Render Tabs
   * @memberOf TabsRenderer
   * @returns {*|jQuery}
   */
  renderTabs() {
    return window.$('<div class="tabs-wrapper mb-2 mt-2" />').append(
        this.renderScroller(),
        '<ul class="nav nav-pills" />'
    );
  }

  /**
   * Render Tabs content
   * @memberOf TabsRenderer
   * @returns {*|jQuery}
   */
  renderTabItemsContent() {
    return window.$('<div class="tab-content" />');
  }

  /**
   * Add tab item content
   * @memberOf TabsRenderer
   * @param {string} uuid
   * @param content
   * @param {boolean} [active]
   * @returns {*|jQuery}
   */
  addTabItemContent(uuid, content, active) {
    const $item = window.$('<div role="tabpanel" class="tab-pane" />');
    $item.attr({
      id: uuid,
      'aria-labelledby': uuid + '-tab'
    });

    if (active) {
      $item.addClass('active');
    }
    return $item.append(content);
  }

  /**
   * Render Tab item
   * @memberOf TabsRenderer
   * @param $tabs
   * @param {{uuid, $container, text, content, dataToggle}} item
   * @param {boolean} [active]
   */
  addTabItem($tabs, item, active) {
    const $item = window.$('<li class="nav-item"><a class="nav-link"></a></li>'),
        uuid = LibGenerator.UUID(item.uuid);

    const $a = $item.find('a');
    $a.text(item.text).attr({
      href: '#' + uuid,
      id: uuid + '-tab',
      'data-toggle': item.dataToggle || 'tab'
    });

    $tabs.find('ul').append($item);
    item.$container.append(this.addTabItemContent(uuid, item.content, active));

    if (active) {
      $a.addClass('active show');
    }
  }

  /**
   * Get tabs left position
   * @memberOf TabsRenderer
   * @param $container
   * @returns {number}
   */
  getTabsLeftPos($container) {
    return window.$('.nav', $container).position().left;
  }

  /**
   * Re-adjust tabs
   * @memberOf TabsRenderer
   * @param $container
   */
  reAdjustTabs($container) {

    /**
     * Get element
     * @type {TabsRenderer}
     */
    const element = this;

    const $left = this.get$scroller($container, 'left'),
        $right = this.get$scroller($container, 'right'),
        width = $container.outerWidth(),
        leftOffset = element.getTabsLeftPos($container);

    const leftFade = leftOffset < 0,
        $rightLast = window.$('ul li:last', $container),
        rightFade = Math.abs(leftOffset) + width < $rightLast.outerWidth() + $rightLast.position().left;

    $right.stop()[(rightFade ? 'show' : 'hide')]();
    $left.stop()[(leftFade ? 'show' : 'hide')]();
  }

  /**
   * Bin scroll
   * @memberOf TabsRenderer
   * @param $container
   * @returns {boolean}
   */
  bindTabsScroll($container) {

    /**
     * Get element
     * @type {TabsRenderer}
     */
    const element = this;

    const $left = this.get$scroller($container, 'left'),
        $right = this.get$scroller($container, 'right');

    if (!$left.length) {
      return false;
    }

    const $tabs = window.$('.nav', $container);

    $left.off().on('click.left', e => {
      e.preventDefault();
      element.scrollToTab(element.scrollTabsLeft($tabs), $tabs, 0, e)
    });

    $right.off().on('click.right', function(e) {
      e.preventDefault();
      element.scrollToTab(element.scrollTabsRight($tabs, this), $tabs, 1, e);
    });

    element.reAdjustTabs($container.find('.tabs-wrapper'));
  }

  /**
   * Scroll tab
   * @memberOf TabsRenderer
   * @param {number} delta
   * @param $tabs
   * @param {number} side
   */
  scrollToTab(delta, $tabs, side) {

    /**
     * Get element
     * @type {TabsRenderer}
     */
    const element = this,
        $pt = $tabs.parent();

    if (delta) {
      element.reAdjustTabs($pt);
      $tabs.stop().animate({left: (side ? '-' : '+') + '=' + delta + 'px'}, () => element.reAdjustTabs($pt));
    }
  }

  /**
   * Scroll left
   * @memberOf TabsRenderer
   * @param $tabs
   * @returns {number}
   */
  scrollTabsLeft($tabs) {
    return Math.abs($tabs.position().left);
  }

  /**
   * Scroll right
   * @memberOf TabsRenderer
   * @param $tabs
   * @param scroller
   * @returns {*}
   */
  scrollTabsRight($tabs, scroller) {
    const width = $tabs.outerWidth(),
        $lis = window.$('li', $tabs), l = $lis.length;
    for (let i = 0; i < l; i++) {
      const $tab = $lis[i];
      const delta = window.$($tab).position().left + $tab.getBoundingClientRect().width -
          Math.abs(this.getTabsLeftPos()) - width;
      if (delta > 0) return delta + scroller.getBoundingClientRect().width;
    }
  }
}
  