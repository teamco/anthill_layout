/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/api',
    'config/template',
    'config/widget'
], function definePageAPI(BaseAPI, Template, Widget) {

    /**
     * Define Page API
     * @class API
     * @mixin {BaseAPI}
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Create Widget API
         * @param {*} args
         * @param {Boolean} [render]
         * @param {Boolean} [silent]
         * @returns {*}
         */
        createWidget: function createWidget(args, render, silent) {

            /**
             * Define scope
             * @type {Page}
             */
            var scope = this.scope;

            if (!scope.controller.isAllowAddWidget()) {
                scope.logger.warn(
                    anthill.i18n.t('not.allowed.add.widget'),
                    arguments
                );

                return false;
            }

            scope.layout.observer.publish(
                scope.layout.eventmanager.eventList.beforeNestedOrganizer
            );

            return this._createItem(Widget, args, render, silent);
        },

        /**
         * Destroy widget
         * @param widget
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
         * @param {*} [items]
         * @param {Boolean} [silent]
         */
        destroyWidgets: function destroyWidgets(items, silent) {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList.destroyWidgets,
                [items, silent]
            );
        },

        /**
         * Create Template API
         * @param {*} widget
         * @returns {*}
         */
        createTemplate: function createTemplate(widget) {
            return this._renderItem(
                Template, true, widget
            ).api.createPage([], true);
        }

    }, BaseAPI.prototype)
});