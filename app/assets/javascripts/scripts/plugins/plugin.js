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
         * Get page data
         * @member PluginController
         * @returns {Panel}
         */
        getAuthorPanel: function getAuthorPanel() {
            return this.root().panels.author;
        },

        /**
         * Get module by name
         * @member PluginController
         * @returns {*}
         */
        getModuleByName: function getModuleByName(name) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            return panel.model.getModule(
                panel.model.getModuleIndex(name)
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
                panel.model.getModuleIndex('widget-rules')
            ).module;
        },

        /**
         * Get gallery module
         * @member PluginController
         * @return {Gallery}
         */
        getGalleryModule: function getGalleryModule() {

            /**
             * Get panel
             * @type {Panel}
             */
            var panel = this.getAuthorPanel();

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = (panel.model.getModule(
                panel.model.getModuleIndex('gallery')
            ) || {}).module;

            if (!gallery) {
                this.logger.warn('Unable to locate gallery module');
            }

            return gallery;
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
         * Load module content
         * @member PluginController
         * @param {boolean} opened
         * @param {boolean} [force]
         */
        loadModuleContent: function loadModuleContent(opened, force) {

            if (opened) {
                this.view.renderContent(
                    this.controller.getModuleData(),
                    force
                );
            }
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
        },

        /**
         * Get resource class name
         * @member PluginController
         * @param {string} resource
         */
        getResourceClassName: function getResourceClassName(resource) {
            return resource.replace(/\./g, '-');
        },

        /**
         * Define routes setter
         * @member PluginController
         */
        setRoutes: function setRoutes() {

            var routes = this.model.getConfig('routes') || {},
                index;

            for (index in routes) {
                if (routes.hasOwnProperty(index)) {
                    this.controller.setRoute(index, routes[index]);
                }
            }
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