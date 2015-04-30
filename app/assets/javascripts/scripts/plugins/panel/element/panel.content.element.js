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

        this._config(view, opts, $('<div />')).build({
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
            $('.' + resource, this.$).addClass('activated');
        },

        /**
         * Remove items selection
         * @memberOf PanelContentElement
         */
        unselectItems: function unselectItems() {
            $('ul.panel-bar', this.$).children().removeClass('activated');
        }

    }, BaseElement.prototype);

});