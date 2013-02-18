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
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts, this);
        },
        destroyLayout: function destroyLayout() {
            this.logger.info(
                'Destroy Layout',
                this.layout
            );
            delete this.layout;
        },
        createTemplate: function createTemplate(Template, opts) {
            this.template = new Template(opts);
        },
        destroyTemplate: function destroyTemplate() {
            this.logger.info(
                'Destroy Template',
                this.template
            );
            delete this.template;
        },
        setPageHeight: function setPageHeight() {
//            this.view.elements.$page.defineHeight();
        },
        updateLayout: function updateLayout() {
            var layout = this.scope.layout;
            layout.observer.publish(
                layout.eventmanager.eventList.updateMinCellWidth
            );
        },
        debugStart: function debugStart() {
            this.logger.debug('Define debugger');
        },
        debugEnd: function debugEnd() {
            this.logger.debug('Destroy debugger');
        }
    }, BaseController.prototype);
});