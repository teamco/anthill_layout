/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 10:28 PM
 */

define(['modules/controller'], function definePluginBase(BaseController){

    var PluginController = function PluginController() {

    };

    PluginController.extend({

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