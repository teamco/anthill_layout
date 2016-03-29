/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller'
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
         * @param {string} [resource]
         * @returns {boolean|*}
         */
        isOpened: function isOpened(resource) {
            return this.scope.opened[resource || this.getActiveResource()];
        },

        /**
         * Check if panel active
         * @param {string} resource
         * @memberOf PanelController
         * @returns {boolean}
         */
        isActive: function isActive(resource) {
            return this.getActiveResource() === resource;
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
         * Set active resource
         * @memberOf PanelController
         * @returns {string}
         */
        setActiveResource: function setActiveResource(resource) {
            return this.scope.active = resource;
        },

        /**
         * Update opened
         * @memberOf PanelController
         * @param {String} resource
         */
        setBehavior: function setBehavior(resource) {

            if (!resource) {
                return false;
            }

            /**
             * Define $panel
             * @type {PanelElement}
             */
            var $panel = this.scope.view.get$item();

            this.scope.opened[this.getActiveResource()] = false;

            if (this.getActiveResource()) {
                $panel.hideActiveModule();
            }

            /**
             * Update opened instance
             * @type {boolean}
             */
            this.scope.opened[resource] = true;

            /**
             * Define active panel
             * @type {String}
             */
            this.setActiveResource(resource);

            $panel.showActiveModule();
        },

        /**
         * Close panel
         * @memberOf PanelController
         * @param {string} resource
         * @param {boolean} [close]
         */
        closePanel: function closePanel(resource, close) {

            if (!resource) {
                return false;
            }

            var elements = this.view.elements,
                $bar = elements.items['$bar-content'];

            if (this.controller.isActive(resource)) {

                if (this.controller.isOpened(resource) && close) {

                    $bar.deactivateItems();
                    this.view.get$item().hideActiveModule();
                    return false;
                }

            } else {

                this.observer.publish(
                    this.eventmanager.eventList.openPanel,
                    resource
                );
            }

            $bar.selectItem(resource);
        },

        /**
         * Close panels [except this]
         * @memberOf PanelController
         */
        closePanels: function closePanels() {

            var panels = this.root().panels,
                index, panel;

            for (index in panels) {

                if (panels.hasOwnProperty(index)) {

                    /**
                     * Get panel
                     * @type {Panel}
                     */
                    panel = panels[index];

                    panel.observer.publish(
                        panel.eventmanager.eventList.closePanel,
                        [panel.active, false]
                    );
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

            this.view.get$item().toggleModule(resource);
            this.controller.closePanels();

            if (_.isFunction(callback)) {
                callback(event);
            }
        },

        /**
         * Show content
         * @memberOf PanelController
         * @param {string} [resource]
         */
        showContent: function showContent(resource) {

            if (this.controller.isActive(resource) && this.controller.isOpened()) {
                return false;
            }

            /**
             * Define module index
             * @type {number}
             */
            var index = this.model.getModuleIndex(resource);

            /**
             * Define module instance
             * @type {*}
             */
            var module = this.controller.activateModule(index);

            this.view.renderContent(module, true);

            module.view.render();

            module.observer.publish(
                module.eventmanager.eventList.loadModuleContent
            );

            this.controller.setBehavior(resource);
        },

        /**
         * Get render at
         * @memberOf PanelController
         * @returns {*}
         */
        getRenderAt: function getRenderAt() {

            return [
                this.scope.name.toLowerCase(),
                this.model.getConfig('renderAt')
            ].join('-');
        },

        /**
         * Activate module
         * @memberOf PanelController
         * @param {number} index
         * @returns {*}
         */
        activateModule: function activateModule(index) {

            /**
             * Define module config
             * @type {{activated: Boolean, module}}
             */
            var data = this.model.getModule(index);

            if (_.isUndefined(data)) {

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