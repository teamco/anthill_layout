/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/interactions'
], function defineWidgetResize(Interactions) {

    /**
     * Define Resize
     * @class Resizable
     * @extends Interactions
     * @param {Widget} scope
     * @constructor
     */
    var Resizable = function Resizable(scope) {

        /**
         * Define scope
         * @member Resizable
         * @type {Widget}
         */
        this.scope = scope;

        /**
         * Define widget jquery element
         * @member Resizable
         * @type {jQuery}
         */
        this.$scope = scope.view.elements.$widget.$;

        this.checkPermission();
    };

    return Resizable.extend('Resizable', {

        /**
         * Init resizable
         * @member Resizable
         */
        init: function init() {

            /**
             * Define scope
             */
            var scope = this.scope;

            if (scope.permission.authorizedFunctionCall(this.init)) {
                this.$scope.resizable(
                    $.extend({
                        containment: scope.controller.get$page().$,
                        create: this.create.bind(this),
                        start: this.start.bind(this),
                        stop: this.stop.bind(this),
                        resize: this.resize.bind(this)
                    }, scope.model.getConfig('events').resizable)
                );
            }
        },

        /**
         * Enable resize
         * @member Resizable
         */
        enable: function enable() {

            /**
             * Define scope
             */
            var scope = this.scope;

            if (scope.permission.eventTunnelFunctionCall(this.enable) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('enable');
            }
        },

        /**
         * Disable resize
         * @member Resizable
         */
        disable: function disable() {

            /**
             * Define scope
             */
            var scope = this.scope;

            if (scope.permission.eventTunnelFunctionCall(this.disable) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('disable');
            }
        },

        /**
         * Destroy resize
         * @member Resizable
         */
        destroy: function destroy() {

            /**
             * Define scope
             */
            var scope = this.scope;

            if (scope.permission.eventTunnelFunctionCall(this.destroy) &&
                scope.controller.isResizable()) {
                this.$scope.resizable('destroy');
            }
        },

        /**
         * Create resize
         * @member Resizable
         * @param event
         * @param ui
         */
        create: function create(event, ui) {

            /**
             * Define scope
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.createResizable,
                [event.type, arguments]
            );
        },

        /**
         * Start resize
         * @member Resizable
         * @param event
         * @param ui
         */
        start: function start(event, ui) {

            /**
             * Define scope
             */
            var scope = this.scope;

            this.debugUI(event, ui);

            scope.controller.setAsCurrent();
            scope.wireframe.resizeSticker();

            scope.observer.publish(
                scope.eventmanager.eventList.startResizable,
                [event.type, arguments]
            );
        },

        /**
         * Stop resize
         * @member Resizable
         * @param event
         * @param ui
         */
        stop: function stop(event, ui) {

            /**
             * Define scope
             */
            var scope = this.scope;

            this.debugUI(event, ui);

            scope.observer.publish(
                scope.eventmanager.eventList.stopResizable,
                [event.type, arguments]
            );
            scope.wireframe.hide();
        },

        /**
         * On resize event
         * @member Resizable
         * @param event
         * @param ui
         */
        resize: function resize(event, ui) {

            /**
             * Define scope
             */
            var scope = this.scope;

            this.debugUI(event, ui);

            scope.observer.publish(
                scope.eventmanager.eventList.resizeResizable,
                [event.type, arguments]
            );
        }

    }, Interactions.prototype);
});