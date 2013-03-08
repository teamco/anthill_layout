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
        /**
         * Get workspace
         * @returns {*}
         */
        getWorkspace: function getWorkspace() {
            return this.scope.config.parent;
        },
        /**
         * Create page layout
         * @param {Function} Layout
         * @param {{}} opts
         */
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
        },
        /**
         * Get Layout
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.scope.layout;
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
        updateLayout: function updateLayout() {
            var layout = this.scope.layout;
            layout.observer.publish(
                layout.eventmanager.eventList.updateMinCellWidth
            );
        },
        widgetLoad: function widgetLoad() {
            this.logger.debug('Load widget');
        },
        /**
         * Downgrade widgets layer except widget
         * @param {{model, view}} widget
         */
        downgradeLayer: function downgradeLayer(widget) {
            var items = this.model.getItems(),
                item, index;

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    item = items[index];

                    if (widget.model.getUUID() !== item.model.getUUID()) {
                        item.view.elements.$widget._downgradeLayer(50);
                    }
                }
            }

            widget.view.elements.$widget._downgradeLayer(51);

        }
    }, BaseController.prototype);
});