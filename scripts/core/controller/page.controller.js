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
    var Controller = function Controller() {

    };

    return Controller.extend({
        setPageHeight: function setPageHeight() {
//            this.view.elements.$page.defineHeight();
        },
        widgetLoad: function widgetLoad() {
            this.logger.debug('Load widget');
        },

        /**
         * Reject to destroy widget
         */
        rejectWidgetDestroy: function rejectWidgetDestroy() {
            var scope = this.scope,
                $modal = scope.view.elements.$modal;
            scope.logger.debug(
                'Reject widget destroy',
                $modal.item
            );

            $modal.selfDestroy();

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

                    if (widget.model.getUUID() !== item.model.getUUID()) {
                        item.view.elements.$widget._downgradeLayer(50);
                    }
                }
            }

            widget.view.elements.$widget._downgradeLayer(51);

        }
    }, BaseController.prototype, BasePage.prototype);
});