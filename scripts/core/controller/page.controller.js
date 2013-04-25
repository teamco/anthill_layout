/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/controller',
    'modules/page'
], function definePageController(BaseController, BasePage) {
    var Controller = function Controller() {

    };

    return Controller.extend({
        /**
         * Get workspace
         * @returns {*}
         */
        getWorkspace: function getWorkspace() {
            return this.scope.config.parent;
        },
        /**
         * Create template
         * @param {Function} Template
         * @param {{}} opts
         */
        createTemplate: function createTemplate(Template, opts) {
            this.template = new Template(opts);
        },
        /**
         * Destroy template
         */
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
        widgetLoad: function widgetLoad() {
            this.logger.debug('Load widget');
        }
    }, BaseController.prototype, BasePage.prototype);
});