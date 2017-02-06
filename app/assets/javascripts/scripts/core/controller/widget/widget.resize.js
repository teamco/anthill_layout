/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Interactions'
], function defineWidgetResize(Interactions) {

    /**
     * Define Resize
     * @class Resizable
     * @extends Interactions
     * @param {Widget} scope
     * @memberOf Widget.interactions
     * @constructor
     */
    var Resizable = function Resizable(scope) {

        /**
         * Define scope
         * @property Resizable
         * @type {Widget}
         */
        this.scope = scope;

        /**
         * Define widget jquery element
         * @property Resizable
         * @type {jQuery}
         */
        this.$scope = scope.view.get$item().$;

        this.checkPermission();
    };

    return Resizable.extend('Resizable', {

        /**
         * Init resizable
         * @memberOf Resizable
         */
        init: function init() {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            // Get resizable config
            var resizable = scope.model.getConfig('events').resizable;

            if (scope.permission.authorizedFunctionCall(this.init)) {

                resizable = scope.controller.validateInteractionConfig(
                    'resizable', resizable
                );

                if (resizable) {

                    this.$scope.resizable(
                        $.extend({
                            containment: resizable.containment,
                            create: this.create.bind(this),
                            start: this.start.bind(this),
                            stop: this.stop.bind(this),
                            resize: this.resize.bind(this)
                        }, resizable)
                    );
                }
            }
        },

        /**
         * Enable resize
         * @memberOf Resizable
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
         * @memberOf Resizable
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
         * @memberOf Resizable
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
         * @memberOf Resizable
         * @param {Event} event
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
         * @memberOf Resizable
         * @param {Event} event
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
         * @memberOf Resizable
         * @param {Event} event
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
         * @memberOf Resizable
         * @param {Event} event
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