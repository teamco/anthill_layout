/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePanelElement(BaseElement) {

    /**
     * Define Panel Element
     * @param view
     * @param opts
     * @returns {PanelElement}
     * @constructor
     * @class PanelElement
     * @extends BaseElement
     */
    var PanelElement = function PanelElement(view, opts) {

        this.view = view;
        this.id = opts.id;

        return this;
    };

    return PanelElement.extend('PanelElement', {

        /**
         * Hide Active module
         * @memberOf PanelElement
         */
        hideActiveModule: function hideActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].hide();
        },

        /**
         * Show Active module
         * @memberOf PanelElement
         */
        showActiveModule: function showActiveModule() {
            this.view.elements.items[this.getContentItemIndex()].show();
        },

        /**
         * Get item index
         * @memberOf PanelElement
         * @returns {string}
         */
        getContentItemIndex: function getContentItemIndex() {
            return ['$', this.view.scope.active, '-content'].join('');
        }

    }, BaseElement.prototype);

});