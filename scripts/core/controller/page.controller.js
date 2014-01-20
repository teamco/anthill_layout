/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller',
    'modules/page'
], function definePageController(BaseController, BasePage) {

    /**
     * Define page controller
     * @class Controller
     * @mixin {BaseController, BasePage}
     * @constructor
     */
    var Controller = function Controller() {

    };

    return Controller.extend({

        /**
         * Check if allowed to add widget to page
         */
        isAllowAddWidget: function isAllowAddWidget() {
            var allow = this.model.getConfig('widget').allowToAdd;
            this.scope.logger.debug('Is allowed to add widget?', allow);
            return allow;
        },

        /**
         * Allow to add widget to page
         */
        allowAddWidget: function allowAddWidget() {
            this.scope.logger.debug('Allow to add widget');
            this.model.getConfig('widget').allowToAdd = true;
        },

        /**
         * Do not allow to add widget to page
         */
        banAddWidget: function banAddWidget() {
            this.scope.logger.debug('Do not allow to add widget');
            this.model.getConfig('widget').allowToAdd = false;
        },

        /**
         * Update page height
         */
        updateHeight: function updateHeight() {
            console.log('TODO: Update height');
        },

        /**
         * Get widgets container
         * @returns {*}
         */
        getWidgetsContainer: function getWidgetsContainer() {
            return this.scope.view.elements.$widgets;
        },

        /**
         * Downgrade widgets layer except widget
         * @param {{model, view}} widget
         */
        downgradeLayer: function downgradeLayer(widget) {
            var items = this.model.getItems(),
                item, index;

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    item = items[index];
                    item.view.elements.$widget._downgradeLayer(50);
                }
            }

            widget.view.elements.$widget._downgradeLayer(51);
        }

    }, BaseController.prototype, BasePage.prototype);
});