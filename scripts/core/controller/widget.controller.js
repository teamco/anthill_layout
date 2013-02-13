/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller',
    'controller/widget/widget.drag',
    'controller/widget/widget.resize'
], function defineWidgetController(BaseController, Drag, Resize) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        setupInteractions: function setupInteractions() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.initDrag);
            this.scope.observer.publish(this.scope.eventmanager.eventList.initResize);
        },
        initDrag: function initDrag() {
            this.controller.setInteraction(
                this.permission.rulesList.draggable,
                new Drag(this)
            );
        },
        enableDrag: function enableDrag() {
            this.interactions.draggable.enable();
        },
        disableDrag: function disableDrag() {
            this.interactions.draggable.disable();
        },
        destroyDrag: function destroyDrag() {
            this.interactions.draggable.destroy();
        },
        initResize: function initResize() {
            this.controller.setInteraction(
                this.permission.rulesList.resizable,
                new Resize(this)
            );
        },
        enableResize: function enableResize() {
            this.interactions.draggable.enable();
        },
        disableResize: function disableResize() {
            this.interactions.draggable.disable();
        },
        destroyResize: function destroyResize() {
            this.interactions.draggable.destroy();
        }

    }, BaseController.prototype);
});