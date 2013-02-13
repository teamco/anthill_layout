/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jqueryui'
], function defineWidgetResize() {
    var Resize = function Resize(scope) {
        this.scope = scope;
        this.$scope = scope.view.elements.$widget.$;
        this.checkPermission();
    };

    return Resize.extend({
        checkPermission: function checkPermission() {
            var scope = this.scope;
            scope.permission.check({
                capability: scope.permission.rulesList.resizable,
                callback: this.init.bind(this)
            });
        },
        init: function init() {
            var scope = this.scope;

            if (scope.permission.authorizedFunctionCall(this.init)) {
                this.$scope.resizable({
                    containment: scope.config.parent.view.elements.$page.$,
                    create: this.create.bind(this),
                    start: this.start.bind(this),
                    stop: this.stop.bind(this),
                    resize: this.resize.bind(this)
                });
            }
        },
        enable: function enable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.enable)) {
                this.$scope.resizable('enable');
            }
        },
        disable: function disable() {
            if (this.scope.permission.eventTunnelFunctionCall(this.disable)) {
                this.$scope.resizable('disable');
            }
        },
        destroy: function destroy() {
            if (this.scope.permission.eventTunnelFunctionCall(this.destroy)) {
                this.$scope.resizable('destroy');
            }
        },
        create: function create(event, ui) {
        },
        start: function start(event, ui) {
        },
        stop: function stop(event, ui) {
        },
        resize: function resize(event, ui) {
        }
    });
});