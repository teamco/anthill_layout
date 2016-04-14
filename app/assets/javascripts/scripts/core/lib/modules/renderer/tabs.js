/**
 * Created by teamco on 7/10/14.
 */
define(function defineTabsRenderer() {

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
         * Render scroller
         * @memberOf TabsRenderer
         * @returns {*|jQuery}
         */
        renderScroller: function renderScroller() {
            return [
                '<div class="scroller scroller-left"><i class="glyphicon glyphicon-chevron-left"></i></div>',
                '<div class="scroller scroller-right"><i class="glyphicon glyphicon-chevron-right"></i></div>'
            ].join('');
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
         * Calculate width of tabs
         * @memberOf TabsRenderer
         * @param $container
         * @returns {number}
         */
        widthOfTabs: function widthOfTabs($container) {
            var itemsWidth = 0;
            $('.nav-tabs li', $container).each(function _eachTab() {
                itemsWidth += $(this).outerWidth();
            });
            return itemsWidth;
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

            var $left = $('.scroller-left', $container),
                $right = $('.scroller-right', $container),
                width = $container.outerWidth(),
                leftOffset = element.getTabsLeftPos($container);

            var leftFade = leftOffset < 0,
                $rightLast = $('ul li:last', $container),
                rightFade = Math.abs(leftOffset) + width < $rightLast.outerWidth() + $rightLast.position().left;

            $right['fade' + (rightFade ? 'In' : 'Out')]();
            $left['fade' + (leftFade ? 'In' : 'Out')]();
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

            var $left = $('.scroller-left', $container),
                $right = $('.scroller-right', $container);

            if (!$left.length) {
                return false;
            }

            var $tabs = $('.nav-tabs', $container);

            $left.off().on('click.left', function _scrollLeft() {
                element.scrollToTab(
                    element.scrollTabsLeft($tabs, this),
                    $tabs, 0
                );
            });

            $right.off().on('click.right', function _scrollRight() {
                element.scrollToTab(
                    element.scrollTabsRight($tabs, this),
                    $tabs, 1
                );
            });

            element.reAdjustTabs($container);
        },

        /**
         * Scroll tab
         * @memberOf TabsRenderer
         * @param delta
         * @param $tabs
         * @param side
         */
        scrollToTab: function scrollToTab(delta, $tabs, side) {

            /**
             * Get element
             * @type {TabsRenderer}
             */
            var element = this,
                $pt = $tabs.parent();

            if (delta) {
                $tabs.animate(
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
        scrollTabsLeft: function scrollTabsLeft($tabs, scroller) {
            var cr, nr, ct, nt, sr, delta, offset,
                $lis = $('li', $tabs), i = 0, l = $lis.length;
            for (; i < l; i++) {
                ct = $lis[i];
                nt = $lis[i + 1];
                sr = scroller.getBoundingClientRect().width;
                offset = Math.abs(this.getTabsLeftPos());
                cr = $(ct).position();
                delta = cr.left - sr - offset;
                if (nt) {
                    nr = $(nt).position();
                    if (delta < 0 && nr.left - sr - offset >= 0) {
                        return Math.abs(delta) - ($(ct).prev().length ? 0 : sr);
                    }
                } else if (l === 1) {
                    return Math.abs(delta) - sr;
                }
            }
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
                delta = $($tab).position().left + $tab.getBoundingClientRect().width - Math.abs(this.getTabsLeftPos()) - width;
                if (delta > 0) return delta + scroller.getBoundingClientRect().width;
            }
        }
    });
});