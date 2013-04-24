/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineTemplateController(BaseController) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts, this);
        },
        /**
         * Destroy layout
         */
        destroyLayout: function destroyLayout() {
            this.logger.info(
                'Destroy Layout',
                this.layout
            );
            delete this.layout;
        }
    }, BaseController.prototype);

});