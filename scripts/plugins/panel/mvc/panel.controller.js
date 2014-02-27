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
         * Update opened
         * @param {Boolean} opened
         */
        setBehavior: function setBehavior(opened) {

            /**
             * Update opened instance
             */
            this.scope.opened = !!opened;
        },

        /**
         * Close panel
         */
        closePanel: function closePanel() {
            this.view.elements.$panel.toggle(false);
        },

        /**
         * Open panel
         */
        openPanel: function openPanel() {
            this.view.elements.$panel.toggle(true);
        },


        /**
         * Show content
         * @param {Boolean} opened
         * @param {Number} [index]
         */
        showContent: function showContent(opened, index) {

            // TODO change to dynamic
            index = index || 0;

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
            var data = this.model.getModule(index) || {};

            if (data && !data.activated) {

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