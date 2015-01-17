/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigActivate() {

    /**
     * Define SiteConfig Activate
     * @class SiteConfigActivate
     * @constructor
     */
    var SiteConfigActivate = function SiteConfigActivate() {

    };

    return SiteConfigActivate.extend('SiteConfigActivate', {

        /**
         * Define activate storage
         * @member SiteConfigActivate
         */
        activateStorage: function activateStorage() {
            this.view.activateConfirmation();
        },

        /**
         * Define approve activate storage
         * @member SiteConfigActivate
         */
        approveActivate: function approveActivate() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.scope;

            /**
             * Get root
             * @type {App}
             */
            var root = this.root();

            /**
             * Get create update site route
             * @type {{string[]}}
             */
            var route = scope.config.routes.activateSiteStorage,
                key = this.root().model.getConfig('appName'),
                opts = {

                    dataType: 'json',

                    url: route[0] + key,
                    method: route[1],

                    data: this.prepareXhrData({
                        author_site_version: {
                            version: root.model.getConfig('version')
                        }
                    })
                };

            $.ajax(opts).done(function (data, type, xhr) {

                scope.logger.debug(data.notice, arguments);

                /**
                 * Define $modal
                 * @type {ModalElement}
                 */
                var $modal = scope.view.elements.$modal;

                if (scope.base.isDefined($modal)) {
                    $modal.selfDestroy();
                }

            }.bind(this));
        }
    });
});