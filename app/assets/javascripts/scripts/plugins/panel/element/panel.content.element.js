/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function definePanelContentElement(PluginElement) {

    /**
     * Define Panel Content Element
     * @constructor
     * @class PanelContentElement
     * @extends PluginElement
     * @param {PanelView} view
     * @param opts
     * @returns {PanelContentElement}
     */
    var PanelContentElement = function PanelContentElement(view, opts) {

        this._config(view, opts, $('<div class="content-container" />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PanelContentElement.extend('PanelContentElement', {

        /**
         * Select item
         * @memberOf PanelContentElement
         * @param {string} resource
         */
        selectItem: function selectItem(resource) {
            this.unselectItems();
            $('.content.' + resource, this.$).addClass('activated').removeClass('collapsed');
        },

        /**
         * Remove items selection
         * @memberOf PanelContentElement
         */
        unselectItems: function unselectItems() {
            this.deactivateItems().addClass('collapsed');
        },

        /**
         * Remove items activation
         * @memberOf PanelContentElement
         * @returns {*|jQuery}
         */
        deactivateItems: function deactivateItems() {
            return $('ul.panel-bar li', this.$).removeClass('activated collapsed');
        }

    }, PluginElement.prototype);
});