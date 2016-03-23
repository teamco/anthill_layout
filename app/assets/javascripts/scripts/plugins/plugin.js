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
         * Get designtime panel
         * @memberOf PluginController
         * @returns {Panel}
         */
        getDesignTimePanel: function getDesignTimePanel() {
            return this.root().panels.designTime;
        },

        /**
         * Get runtime panel
         * @memberOf PluginController
         * @returns {Panel}
         */
        getRunTimePanel: function getRunTimePanel() {
            return this.root().panels.runTime;
        },

        /**
         * Get module by name
         * @memberOf PluginController
         * @returns {*}
         */
        getModuleByName: function getModuleByName(name) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

            return panel.model.getModule(
                panel.model.getModuleIndex(name)
            ).module;
        },

        /**
         * Get package by name
         * @memberOf PluginController
         * @returns {*}
         */
        getPackageByName: function getPackageByName(name) {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

            return panel.model.getPackage(
                panel.model.getPackageIndex(name)
            );
        },

        /**
         * Get widget rules
         * @memberOf PluginController
         * @returns {WidgetRules}
         */
        getWidgetRules: function getWidgetRules() {

            /**
             * Define panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

            return panel.model.getModule(
                panel.model.getModuleIndex('widget-rules')
            ).module;
        },

        /**
         * Get gallery module
         * @memberOf PluginController
         * @return {Gallery}
         */
        getGalleryModule: function getGalleryModule() {

            /**
             * Get panel
             * @type {Panel}
             */
            var panel = this.getDesignTimePanel();

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
         * @memberOf PluginController
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {
            return this.base.lib.hash.isHashEmpty(
                this.scope.view.elements.items
            );
        },

        /**
         * Update translations
         * @memberOf PluginController
         * @param {string} i18nPath
         * @param {Function|_successRenderedCallback} callback
         */
        updateTranslations: function updateTranslations(i18nPath, callback) {

            /**
             * Define this reference
             * @type {*}
             */
            var plugin = this;

            require([i18nPath], function defineEnUs(EnUs) {

                plugin.i18n.updateData(EnUs);

                if (_.isFunction(callback)) {
                    callback();
                }
            });
        },

        /**
         * Load module content
         * @memberOf PluginController
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

            if (!$element) {
                return false;
            }

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
         * @memberOf PluginController
         * @param {Widget} widget
         */
        defineContentReferrer: function defineContentReferrer(widget) {

            /**
             * Define content
             * @type {*}
             */
            var content = widget.controller.getContent();

            if (!content) {
                widget.logger.warn('Undefined content');
                return false;
            }

            content.observer.publish(
                content.eventmanager.eventList.defineReferrer,
                this.scope
            );
        },

        /**
         * Get resource class name
         * @memberOf PluginController
         * @param {string} resource
         */
        getResourceClassName: function getResourceClassName(resource) {
            return resource.replace(/\./g, '-');
        },

        /**
         * Refresh module content
         * @memberOf PluginController
         * @param {string} moduleName
         */
        refreshModuleContent: function refreshModuleContent(moduleName) {

            /**
             * Get scope
             * @type {PageData|Maximize}
             */
            var scope = this.scope;

            /**
             * Get panel
             * @type {Panel}
             */
            var panel = scope.containment;

            /**
             * Get module name
             * @type {string}
             */
            var activeModule = panel.active,
                resourceName = panel.model.getPanelEntityResourceName(scope);

            if (activeModule !== resourceName) {

                scope.logger.debug('Module does not activated in panel');
                return false;
            }

            scope.logger.debug('Refresh content');

            panel.observer.publish(
                panel.eventmanager.eventList.showContent,
                [true, moduleName]
            );
        },

        /**
         * Subscribe to refresh content after destroy items
         * @memberOf PluginController
         */
        subscribeRefreshContentAfterDestroyItems: function subscribeRefreshContentAfterDestroyItems() {

            /**
             * Get page
             * @type {Page|PageData|Maximize}
             */
            var page = this.getPage(),
                scope = this.scope;

            /**
             * Get event manager
             * @type {PageEventManager}
             */
            var pageEventManager = page.eventmanager;

            pageEventManager.subscribe({
                event: {
                    eventName: pageEventManager.eventList.afterDestroyItems
                },
                callback: function destroyWidgetsCallback() {

                    scope.controller.refreshModuleContent(
                        scope.containment.model.getPanelEntityResourceName(scope)
                    )
                }
            }, false);
        },

        /**
         * Subscribe refresh content after switch to page
         * @memberOf PluginController
         */
        subscribeRefreshContentSwitchPage: function subscribeRefreshContentSwitchPage() {

            /**
             * Get workspace
             * @type {Workspace|PageData|Maximize}
             */
            var workspace = this.getWorkspace(),
                scope = this.scope;

            /**
             * Get event manager
             * @type {WorkspaceEventManager}
             */
            var workspaceEventManager = workspace.eventmanager;

            workspaceEventManager.subscribe({
                event: {
                    eventName: workspaceEventManager.eventList.afterSwitchToPage
                },
                callback: function afterSwitchToPageCallback() {

                    scope.controller.refreshModuleContent(
                        scope.containment.model.getPanelEntityResourceName(scope)
                    )
                }
            }, false);
        }

    }, AntHill.prototype, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = PluginController.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     * @memberOf PluginController
     * @param {function} [callback]
     */
    PluginController.prototype.successRendered = function successRendered(callback) {

        /**
         * Define callback
         * @returns {boolean}
         * @param {PluginController} plugin
         * @private
         */
        function _successRenderedCallback(plugin) {

            if (_.isFunction(callback)) {

                var html = plugin.model.getConfig('html');

                if (_.isUndefined(html.selector)) {

                    plugin.logger.warn('Configuration of render: false', html);
                    return false;
                }

                callback();

            } else {

                plugin.logger.warn('Callback should be function type', callback);
            }
        }

        successRenderedSuper.bind(this)();

        /**
         * Define isWidget
         * @type {*|boolean}
         */
        var isWidget = this.controller.isWidgetContent();

        if (isWidget) {

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = this.controller.getContainment();

            widget.controller.prepareRenderingContent(
                this, _successRenderedCallback
            );

        } else {

            _successRenderedCallback(this);
        }
    };

    return PluginController;
});