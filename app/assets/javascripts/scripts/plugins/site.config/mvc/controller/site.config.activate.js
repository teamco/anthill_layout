/**
 * Created by teamco on 11/4/14.
 */

define(function defineSiteConfigActivate() {

    /**
     * Define SiteConfig Activate
     * @class SiteConfigActivate
     * @extends AntHill
     * @extends BaseController
     * @extends Routes
     * @constructor
     */
    var SiteConfigActivate = function SiteConfigActivate() {
    };

    return SiteConfigActivate.extend('SiteConfigActivate', {

        /**
         * Define activate storage
         * @memberOf SiteConfigActivate
         */
        activateStorage: function activateStorage() {
            this.view.activateConfirmation();
        },

        /**
         * Define approve activate storage
         * @memberOf SiteConfigActivate
         */
        approveActivate: function approveActivate() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.scope;

            /**
             * Get root config
             * @type {{activate: boolean, mode: string, appName: string}}
             */
            var config = this.root().model.getConfig();

            /**
             * Define $modal
             * @type {ModalElement}
             */
            var $modal = scope.view.elements.$modal;

            if (!scope.base.isDefined($modal)) {
                scope.logger.warn('Undefined $modal');
                return false;
            }

            var route = scope.config.routes.activateSiteStorage,
                opts = {
                    dataType: 'json',
                    url: [route[0], config.appName, config.version].join('/'),
                    method: route[1],
                    data: this.prepareXhrData()
                };

            if (config.activate) {
                scope.logger.warn('Version already activated');
                return false;
            }

            $.ajax(opts).done(function (data, type, xhr) {
                scope.logger.debug(data.notice, arguments);
                $modal.selfDestroy();
            });
        }
    });
});