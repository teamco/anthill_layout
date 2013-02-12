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
        setup: function setup() {
            this.setEvent('draggable', new Drag(this.scope));
            this.setEvent('resizable', new Resize(this.scope));
        }
    }, BaseController.prototype);
});