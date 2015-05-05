/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePanelController(PluginController) {

    /**
     * Define panel controller
     * @class PanelController
     * @constructor
     * @extends PluginController
     * @extends AntHill
     */
    var PanelController = function PanelController() {
    };

    return PanelController.extend('PanelController', {

        /**
         * Check if panel resizable
         * @memberOf PanelController
         * @returns {boolean}
         */
        isResizable: function isResizable() {

            /**
             * Define model
             * @type {PanelModel}
             */
            var model = this.model;

            return model.getConfig('html/resizable') ?
                model.getConfig('renderAt') : false;
        },

        /**
         * Define modules
         * @memberOf PanelController
         * @param modules
         */
        defineModules: function defineModules(modules) {

            for (var i = 0, l = modules.length; i < l; i++) {
                this.model.defineModule(modules[i]);
            }
        },

        /**
         * Define packages
         * @memberOf PanelController
         * @param packages
         */
        definePackages: function definePackages(packages) {

            for (var i = 0, l = packages.length; i < l; i++) {
                this.model.definePackage(packages[i]);
            }
        },

        /**
         * Check if opened
         * @memberOf PanelController
         * @returns {boolean|*}
         */
        isOpened: function isOpened() {
            return this.scope.opened;
        },

        /**
         * Check if panel active
         * @param {string} resource
         * @memberOf PanelController
         * @returns {boolean}
         */
        isActive: function isActive(resource) {
            return this.scope.active === resource;
        },

        /**
         * Refresh modules content
         * @memberOf PanelController
         */
        refreshModulesContent: function refreshModulesContent() {

            if (this.controller.isOpened()) {

                this.observer.publish(
                    this.eventmanager.eventList.showContent,
                    [true, this.controller.getActiveResource()]
                );
            }
        },

        /**
         * Get active resource
         * @memberOf PanelController
         * @returns {string}
         */
        getActiveResource: function getActiveResource() {
            return this.scope.active;
        },

        /**
         * Update opened
         * @memberOf PanelController
         * @param {String} resource
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(resource, opened) {

            /**
             * Define $panel
             * @type {PanelElement}
             */
            var $panel = this.scope.view.elements.$panel;

            if (typeof(this.scope.active) === 'string') {
                $panel.hideActiveModule();
            }

            /**
             * Update opened instance
             */
            this.scope.opened = !!opened;

            /**
             * Define active panel
             * @type {String}
             */
            this.scope.active = resource;

            $panel.showActiveModule();
        },

        /**
         * Close panel
         * @memberOf PanelController
         * @param {string} resource
         */
        closePanel: function closePanel(resource) {

            if (!resource) {
                return false;
            }

            if (this.active === resource) {

                this.view.elements.$panel.toggle(resource, false);
                this.view.elements.items['$bar-content'].unselectItems();

            } else {

                this.observer.publish(
                    this.eventmanager.eventList.openPanel,
                    resource
                );
            }
        },

        /**
         * Close panels [except this]
         * @memberOf PanelController
         * @param {Panel} [except]
         */
        closePanels: function closePanels(except) {

            /**
             * Get panels
             * @type {Application.panels}
             */
            var panels = this.root().panels,
                index, panel;

            for (index in panels) {

                if (panels.hasOwnProperty(index)) {

                    panel = panels[index];

                    if (panel !== except) {

                        panel.observer.publish(
                            panel.eventmanager.eventList.closePanel,
                            panel.active
                        );
                    }
                }
            }
        },

        /**
         * Open panel
         * @memberOf PanelController
         * @param {string} resource
         * @param {*} [event]
         * @param {function} [callback]
         */
        openPanel: function openPanel(resource, event, callback) {

            this.controller.closePanels(this);

            /**
             * Define $bar
             * @type {PanelContentElement}
             */
            var $bar = this.view.elements.items['$bar-content'];

            $bar.unselectItems();
            $bar.selectItem(resource);

            this.view.elements.$panel.toggle(resource, true);

            if (this.base.isFunction(callback)) {
                callback(event);
            }
        },

        /**
         * Show content
         * @memberOf PanelController
         * @param {Boolean} opened
         * @param {string} [resource]
         */
        showContent: function showContent(opened, resource) {

            /**
             * Define module index
             * @type {number}
             */
            var index = this.model.getModuleIndex(resource);

            if (opened) {

                /**
                 * Define module instance
                 * @type {*}
                 */
                var module = this.controller.activateModule(opened, index);

                this.view.renderContent(module, true);

                module.view.render();

                module.observer.publish(
                    module.eventmanager.eventList.loadModuleContent,
                    opened
                );
            }
        },

        /**
         * Get render at
         * @memberOf PanelController
         * @returns {*}
         */
        getRenderAt: function getRenderAt() {

            return [
                this.scope.constructor.prototype.name.toLowerCase(),
                this.model.getConfig('renderAt')
            ].join('-');
        },

        /**
         * Activate module
         * @memberOf PanelController
         * @param {Boolean} opened
         * @param {Number} index
         * @returns {*}
         */
        activateModule: function activateModule(opened, index) {

            /**
             * Define module config
             * @type {{activated: Boolean, module}}
             */
            var data = this.model.getModule(index);

            if (typeof(data) === 'undefined') {

                this.scope.logger.error('Undefined module');
                return false;
            }

            if (!data.activated) {

                /**
                 * Activate module
                 * @type {boolean}
                 */
                data.activated = true;
            }

            return data.module;
        },

        /**
         * Render packages
         * @memberOf PanelController
         */
        renderPackages: function renderPackages() {

            /**
             * Init packages
             * @type {*}
             */
            var packages = this.model.getPackage();

            for (var i = 0, l = packages.length; i < l; i++) {

                /**
                 * Define package local instance
                 * @type {*}
                 */
                var module = packages[i];

                this.scope.view.renderContent(module, false);

                module.view.render();
                module.controller.loadContent();
            }
        },

        /**
         * Execute generic event
         * @memberOf PanelController
         */
        executeGenericEvent: function executeGenericEvent() {
            this.observer.publish(
                this.eventmanager.eventList.closePanel,
                this.active
            );
        },

        /**
         * Subscribe to generic event
         * @memberOf PanelController
         */
        subscribeGenericEvent: function subscribeGenericEvent() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var ws = this.controller.getWorkspace();

            /**
             * Get workspace
             * @type {WorkspaceEventManager}
             */
            var wsEventManager = ws.eventmanager;

            if (!wsEventManager) {

                this.logger.warn('Workspace not initialized', ws);
                return false;
            }

            wsEventManager.subscribe({
                event: {
                    eventName: wsEventManager.eventList.switchToPage
                },
                callback: this.controller.executeGenericEvent.bind(this)
            }, false);
        }

    }, PluginController.prototype);
});