/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin'
], function definePanelController(PluginBase) {

    /**
     * Define panel controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Define modules
         * @param modules
         */
        defineModules: function defineModules(modules) {

            for (var i = 0, l = modules.length; i < l; i++) {
                this.model.defineModule(modules[i]);
            }
        },

        /**
         * Define packages
         * @param packages
         */
        definePackages: function definePackages(packages) {

            for (var i = 0, l = packages.length; i < l; i++) {
                this.model.definePackage(packages[i]);
            }
        },

        /**
         * Check if opened
         * @returns {boolean|*}
         */
        isOpened: function isOpened() {
            return this.scope.opened;
        },

        /**
         * Check if panel active
         * @param {string} resource
         * @returns {boolean}
         */
        isActive: function isActive(resource) {
            return this.scope.active === resource;
        },

        /**
         * Update opened
         * @param {String} resource
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(resource, opened) {

            /**
             * Define $panel
             * @type {element.page.page.element}
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
         * @param {string} resource
         */
        closePanel: function closePanel(resource) {

            if (this.active === resource) {
                this.view.elements.$panel.toggle(resource, false);
            } else {
                this.observer.publish(
                    this.eventmanager.eventList.openPanel,
                    resource
                );
            }
        },

        /**
         * Open panel
         * @param {string} resource
         */
        openPanel: function openPanel(resource) {
            this.view.elements.$panel.toggle(resource, true);
        },


        /**
         * Show content
         * @param {Boolean} opened
         * @param {string} [resource]
         */
        showContent: function showContent(opened, resource) {

            /**
             * Define module index
             * @type {number}
             */
            var index = this.model.getIndex(resource);

            if (opened) {

                /**
                 * Define module instance
                 * @type {*}
                 */
                var module = this.controller.activateModule(opened, index);

                this.view.renderContent(module, true);

                module.view.render();
                module.controller.loadContent(opened);
            }
        },

        /**
         * Get render at
         * @returns {*}
         */
        getRenderAt: function getRenderAt() {

            return [
                this.scope.constructor.name.toLowerCase(),
                this.model.getConfig('renderAt')
            ].join('-');
        },

        /**
         * Activate module
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
        }

    }, PluginBase.prototype);
});