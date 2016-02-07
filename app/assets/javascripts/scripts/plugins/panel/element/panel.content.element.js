/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePanelContentElement(BaseElement) {

    /**
     * Define Panel Content Element
     * @param view
     * @param opts
     * @returns {PanelContentElement}
     * @constructor
     * @class PanelContentElement
     * @extends BaseElement
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
            $('.content.' + resource, this.$).addClass('activated').removeClass('collapsed');
        },

        /**
         * Remove items selection
         * @memberOf PanelContentElement
         */
        unselectItems: function unselectItems() {
            $('ul.panel-bar li', this.$).removeClass('activated').addClass('collapsed');
        }

    }, BaseElement.prototype);

});