/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jqueryui'
], function defineWidgetDrag() {
    var Drag = function Drag(scope) {
        this.scope = scope;
        this.$scope = scope.view.elements.$widget.$;
        this.checkPermission();
    };

    return Drag.extend({
        checkPermission: function checkPermission() {
            var scope = this.scope;
            scope.permission.check({
                capability: scope.permission.rulesList.draggable,
                callback: this.init.bind(this)
            });
        },
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
        enable: function enable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.enable)) {
                this.$scope.draggable('enable');
            }
        },
        disable: function disable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.disable)) {
                this.$scope.draggable('disable');
            }
        },
        destroy: function destroy() {
            if (this.scope.permission.eventTunnelFunctionCall(this.destroy)) {
                this.$scope.draggable('destroy');
            }
        },
        create: function create(event, ui) {
        },
        start: function start(event, ui) {
        },
        stop: function stop(event, ui) {
        },
        drag: function drag(event, ui) {
        }
    });
});