/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api',
    'config/template',
    'config/widget'
], function definePageAPI(Base, BaseAPI, Template, Widget) {

    /**
     * Define Page API
     * @class API
     * @extends {Base}
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
         * @returns {*}
         */
        createWidget: function createWidget(args, render) {
            var scope = this.scope;
            if (!scope.controller.isAllowAddWidget()) {
                scope.logger.warn('Do not allowed to add widget', arguments);
                return false;
            }

            scope.layout.observer.publish(scope.layout.eventmanager.eventList.beforeNestedOrganizer);

            return this._createItem(Widget, args, render);
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
            return this._renderItem(Template, true, widget).api.createPage([], true);
        }

    }, Base, BaseAPI.prototype)
});