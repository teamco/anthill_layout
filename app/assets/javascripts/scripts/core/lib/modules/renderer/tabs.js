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
         * @param tabs
         * @param {*} item
         * @param {boolean} [active]
         */
        addTabItem: function addTabItem(tabs, item, active) {

            var $item = $('<li role="presentation"><a href="#"></a></li>'),
                uuid = this.base.lib.generator.UUID(item.uuid);

            $item.find('a').
                text(item.text).
                attr({
                    href: '#' + uuid,
                    id: uuid + '-tab',
                    'data-toggle': item.dataToggle || 'tab'
                });

            tabs.append($item);

            item.$container.append(
                this.addTabItemContent(uuid, item.content, active)
            );

            if (active) {
                $item.addClass('active');
            }
        }
    });
});