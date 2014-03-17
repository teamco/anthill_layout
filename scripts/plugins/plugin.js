/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

define([
    'config/anthill',
    'modules/controller'
], function definePluginControllerBase(AntHill, BaseController){

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
         * @returns {*|Workspace}
         */
        getWorkspace: function getWorkspace() {
            return this.root().controller.getCurrentItem();
        },

        /**
         * Get Page
         * @member PluginController
         * @returns {*|Page}
         */
        getPage: function getPage() {
            return this.getWorkspace().controller.getCurrentItem();
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
         * Check if data was existing
         * @member PluginController
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {

            return this.base.lib.hash.isHashEmpty(
                this.scope.view.elements.content
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

            require([data], function defineEnUs(EnUs){
                plugin.i18n.updateData(EnUs);
            });
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