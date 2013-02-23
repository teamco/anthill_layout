/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/interactions',
    'jqueryui'
], function defineWidgetDrag(Interactions) {
    /**
     * Define Widget Drag
     * @param scope
     * @constructor
     */
    var Draggable = function Draggable(scope) {
        this.scope = scope;
        this.$scope = scope.view.elements.$widget.$;
        this.checkPermission();
    };

    return Draggable.extend({
        /**
         * Init interaction
         */
        init: function init() {

            var scope = this.scope,
                config = scope.config.events.draggable;

            if (scope.permission.authorizedFunctionCall(this.init)) {
                this.$scope.draggable({
                    delay: 300,
                    cursor: 'move',
                    snap: config.snap,
                    iframeFix: config.iframeFix,
                    scroll: config.scroll,
                    scrollSensitivity: 100,
                    scrollSpeed: 100,
                    opacity: 0.6,
                    zIndex: 100,
                    containment: scope.config.parent.view.elements.$page.$,
                    create: this.create.bind(this),
                    start: this.start.bind(this),
                    stop: this.stop.bind(this),
                    drag: this.drag.bind(this)
                });
            }
        },
        /**
         * Enable drag
         */
        enable: function enable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.enable)) {
                this.$scope.draggable('enable');
            }
        },
        /**
         * Disable drag
         */
        disable: function disable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.disable)) {
                this.$scope.draggable('disable');
            }
        },
        /**
         * Destroy drag
         */
        destroy: function destroy() {
            if (this.scope.permission.eventTunnelFunctionCall(this.destroy)) {
                this.$scope.draggable('destroy');
            }
        },
        /**
         * Create drag
         * @param event
         * @param ui
         */
        create: function create(event, ui) {
        },
        /**
         * Start drag
         * @param event
         * @param ui
         */
        start: function start(event, ui) {
            this.debugUI(event, ui);
            this.scope.controller.setAsCurrent();
            this.scope.wireframe.move();
        },
        /**
         * Stop drag
         * @param event
         * @param ui
         */
        stop: function stop(event, ui) {
            this.debugUI(event, ui);
        },
        /**
         * onDrag
         * @param event
         * @param ui
         */
        drag: function drag(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.observer.publish(
                scope.eventmanager.eventList.dragSticker,
                [event.type, false]
            );
        }
    }, Interactions.prototype);
});