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

            this.view.renderContent(
                this.controller.activateModule(index)
            );
        },

        /**
         * Activate module
         * @param {Number} index
         * @returns {*}
         */
        activateModule: function activateModule(index) {

            /**
             * Define module instance
             * @type {{activated: Boolean, module}}
             */
            var data = this.model.getModule(index);

            if (data && !data.activated) {

                data.module.view.defineContainer(
                    this.scope.view.elements.$panel
                );

                data.module.view.render();
            }

            return data.module;
        }


    }, PluginBase.prototype);
});