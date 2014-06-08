/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

define([
    'config/anthill',
    'modules/Controller'
], function definePluginControllerBase(AntHill, BaseController) {

    /**
     * Define Plugin controller
     * @class PluginController
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var PluginController = function PluginController() {

    };

    PluginController.extend('PluginController', {

        /**
         * Get Workspace
         * @member PluginController
         * @param {string} [uuid]
         * @returns {Workspace}
         */
        getWorkspace: function getWorkspace(uuid) {

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.base.isDefined(uuid) ?
                root.model.getItemByUUID(uuid) :
                root.controller.getCurrentItem();

            return workspace;
        },

        /**
         * Get Page
         * @member PluginController
         * @param {string} [uuid]
         * @returns {Page}
         */
        getPage: function getPage(uuid) {

            /**
             * Define workspace
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            /**
             * Define page
             * @type {Page}
             */
            var page = this.base.isDefined(uuid) ?
                workspace.model.getItemByUUID(uuid) :
                workspace.controller.getCurrentItem();

            return page;
        },

        /**
         * Get Widget
         * @member PluginController
         * @returns {*|Widget}
         */
        getWidget: function getWidget() {
            return this.getPage().controller.getCurrentItem();
        },

        /**
         * Get page data
         * @member PluginController
         * @returns {Panel}
         */
        getAuthorPanel: function getAuthorPanel() {
            return this.root().authorPanel;
        },

        /**
         * Get page data
         * @member PluginController
         * @returns {PageData}
         */
        getPageData: function getPageData() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getModule(
                panel.model.getIndex('pagedata')
            ).module;
        },

        /**
         * Get widget rules
         * @member PluginController
         * @returns {WidgetRules}
         */
        getWidgetRules: function getWidgetRules() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getModule(
                panel.model.getIndex('widgetrules')
            ).module;
        },

        /**
         * Check if data was existing
         * @member PluginController
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {
            return this.base.lib.hash.isHashEmpty(
                this.scope.view.elements.items
            );
        },

        /**
         * Update translations
         * @member PluginController
         */
        updateTranslations: function updateTranslations(data) {

            /**
             * Define this reference
             * @type {*}
             */
            var plugin = this;

            require([data], function defineEnUs(EnUs) {
                plugin.i18n.updateData(EnUs);
            });
        },

        /**
         * Locate element
         * @param $element
         * @param {*} e
         * @returns {boolean}
         */
        locateElement: function locateElement($element, e) {

            /**
             * Hide border on locate element
             * @private
             */
            function _hideBorder() {
                $element.$.removeClass('select');
            }

            $element.$.parent().children().removeClass('select');
            $element.$.addClass('select');

            if (e.type === 'mouseleave' || e.type === 'click') {
                setTimeout(_hideBorder, 300);
            }
        },

        /**
         * Define content referrer
         * @member PluginController
         * @param {Widget} widget
         */
        defineContentReferrer: function defineContentReferrer(widget) {

            /**
             * Define content
             * @type {*}
             */
            var content = widget.controller.getContent();

            content.observer.publish(
                content.eventmanager.eventList.defineReferrer,
                this.scope
            );
        }

    }, AntHill.prototype, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = PluginController.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     * @param {function} [callback]
     */
    PluginController.prototype.successRendered = function successRendered(callback) {

        successRenderedSuper.bind(this)();

        if (typeof(callback) === 'function') {

            callback();

        } else {

            this.logger.warn('Undefined callback');
        }
    };

    return PluginController;
});