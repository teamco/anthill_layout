/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'config/anthill',
    'modules/API',
    'config/widget'
], function definePageAPI(AntHill, BaseAPI, Widget) {

    /**
     * Define Page API
     * @class PageAPI
     * @extends BaseAPI
     * @extends AntHill
     * @constructor
     */
    var PageAPI = function PageAPI() {

    };

    return PageAPI.extend('PageAPI', {

        /**
         * Create Widget API
         * @memberOf PageAPI
         * @param {*} args
         * @param {Boolean} [render]
         * @param {Boolean} [silent]
         * @returns {*}
         */
        createWidget: function createWidget(args, render, silent) {

            /**
             * Define scope
             */
            var scope = this.scope;

            if (silent) {
                scope.controller.allowAddWidget();
            }

            if (!scope.controller.isAllowAddWidget()) {
                scope.logger.warn(
                    this.i18n.t('not.allowed.add.widget'),
                    arguments
                );

                return false;
            }

            scope.layout.observer.publish(
                scope.layout.eventmanager.eventList.beforeNestedOrganizer,
                silent
            );

            return scope.controller.updateWidgetsConfig(
                this._createItem(Widget, args, render, silent)
            );
        },

        /**
         * Destroy widget
         * @memberOf PageAPI
         * @param {Widget} widget
         * @param {Boolean} [silent]
         */
        destroyWidget: function destroyWidget(widget, silent) {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.destroyWidget,
                [widget, silent]
            );
        },

        /**
         * Destroy widgets
         * @memberOf PageAPI
         * @param {[Widget]} [items]
         * @param {Boolean} [silent]
         */
        destroyWidgets: function destroyWidgets(items, silent) {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.destroyWidgets,
                [items, silent]
            );
        }

    }, AntHill.prototype, BaseAPI.prototype)
});