/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

define([
    'modules/controller'
], function definePluginControllerBase(BaseController){

    /**
     * Define Plugin controller
     * @class PluginController
     * @constructor
     */
    var PluginController = function PluginController() {

    };

    PluginController.extend({

        /**
         * Get Workspace
         * @returns {*|Workspace}
         */
        getWorkspace: function getWorkspace() {
            return this.root().controller.getCurrentItem();
        },

        /**
         * Get Page
         * @returns {*|Page}
         */
        getPage: function getPage() {
            return this.getWorkspace().controller.getCurrentItem();
        },

        /**
         * Get Widget
         * @returns {*|Widget}
         */
        getWidget: function getWidget() {
            return this.getPage().controller.getCurrentItem();
        },

        /**
         * Check if data was existing
         * @returns {boolean}
         */
        isDataNotExist: function isDataNotExist() {

            return anthill.base.lib.hash.isHashEmpty(
                this.scope.view.elements.content
            );
        },

        /**
         * Update translations
         */
        updateTranslations: function updateTranslations(data) {

            require([data], function defineEnUs(EnUs){
                anthill.i18n.updateData(EnUs);
            });
        }

    }, BaseController.prototype);

    /**
     * Copy successRendered
     * @type {Function}
     */
    var successRenderedSuper = PluginController.prototype.successRendered.clone();

    /**
     * Overwrite success rendered
     */
    PluginController.prototype.successRendered = function successRendered(callback) {

        successRenderedSuper.bind(this)();

        if (anthill.base.isFunction(callback)) {

            callback();
        } else {

            this.logger.warn('Undefined callback');
        }
    };

    return PluginController;
});