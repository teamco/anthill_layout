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
         */
        destroyWidgets: function destroyWidgets() {
            $.each(this.scope.items, function each(uuid, widget) {
                this.destroyWidget(widget);
            }.bind(this));
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