/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller'
], function definePageController(BaseController) {
    var Controller = function Controller() {

    };

    return Controller.extend({
        createWidget: function createWidget(opts) {
            var widget = this.model.createWidget(opts);
            this.logger.info(
                'Create Widget',
                this.model.getUUID(widget),
                widget
            );
        },
        destroyWidget: function destroyWidget(widget) {
            var widgets = this.model.destroyWidget(widget);
            this.logger.info(
                'Destroy Widget',
                widget,
                widgets
            );
        },
        destroyWidgets: function destroyWidgets() {
            var widgets = this.model.destroyWidgets();
            this.logger.info(
                'Destroy Widgets',
                widgets
            );
        },
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts);
        }
    }, BaseController.prototype);
});