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
], function defineWidgetResize(Interactions) {

    /**
     * Define Resize
     * @class Resizable
     * @mixin {Interactions}
     * @param scope
     * @constructor
     */
    var Resizable = function Resizable(scope) {
        this.scope = scope;
        this.$scope = scope.view.elements.$widget.$;
        this.checkPermission();
    };

    return Resizable.extend({
        init: function init() {
            var scope = this.scope;

            if (scope.permission.authorizedFunctionCall(this.init)) {
                this.$scope.resizable(
                    $.extend(this.scope.config.events.resizable, {
                        containment: scope.config.parent.view.elements.$page.$,
                        create: this.create.bind(this),
                        start: this.start.bind(this),
                        stop: this.stop.bind(this),
                        resize: this.resize.bind(this)
                    })
                );
            }
        },
        enable: function enable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.enable) && this.scope.controller.isResizable()) {
                this.$scope.resizable('enable');
            }
        },
        disable: function disable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.disable) && this.scope.controller.isResizable()) {
                this.$scope.resizable('disable');
            }
        },
        destroy: function destroy() {
            if (this.scope.permission.eventTunnelFunctionCall(this.destroy) && this.scope.controller.isResizable()) {
                this.$scope.resizable('destroy');
            }
        },
        create: function create(event, ui) {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.resizeCreate, [event.type, arguments]);
        },
        start: function start(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.controller.setAsCurrent();
            scope.wireframe.resizeSticker();
            scope.observer.publish(scope.eventmanager.eventList.resizeStart, [event.type, arguments]);
        },
        stop: function stop(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.observer.publish(
                scope.eventmanager.eventList.resizeStop,
                [event.type, true, true, arguments]
            );
            scope.wireframe.hide();
        },
        resize: function resize(event, ui) {
            var scope = this.scope;
            this.debugUI(event, ui);
            scope.observer.publish(
                scope.eventmanager.eventList.resizeSticker,
                [event.type, arguments]
            );
        }
    }, Interactions.prototype);
});