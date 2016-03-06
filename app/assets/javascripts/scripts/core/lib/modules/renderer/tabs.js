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
         * Render Tabs
         * @memberOf TabsRenderer
         * @returns {*|jQuery}
         */
        renderTabs: function renderTabs() {
            return $('<ul class="nav nav-tabs" role="tablist" />');
        },

        renderTabItemContent: function renderTabItemContent() {

        },

        /**
         * Render Tab item
         * @memberOf TabsRenderer
         * @param tabs
         * @param {*} item
         * @param {boolean} [active]
         */
        addTabItem: function addTabItem(tabs, item, active) {

            var $item = '<li role="presentation"><a href="#"></a></li>',
                uuid = this.base.lib.generator.UUID(item.uuid);

            $item.find('a').
                text(item.text).
                attr({
                    href: '#' + uuid,
                    id: uuid + '-tab',
                    'aria-expanded': true,
                    'data-toggle': item.dataToggle || 'tab'
                });

            if (active) {
                $item.addClass('active');
            }

            tabs.append($item);
        }
    });
});