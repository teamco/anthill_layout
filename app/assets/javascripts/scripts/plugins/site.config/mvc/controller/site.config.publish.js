/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigPublish() {

    /**
     * Define SiteConfig Publish
     * @class SiteConfigPublish
     * @constructor
     */
    var SiteConfigPublish = function SiteConfigPublish() {

    };

    return SiteConfigPublish.extend('SiteConfigPublish', {

        /**
         * Define publish storage
         * @member SiteConfigPublish
         */
        publishStorage: function publishStorage() {
            this.view.publishConfirmation();
        },

        /**
         * Define approve publish storage
         * @member SiteConfigPublish
         */
        approvePublish: function approvePublish() {

            /**
             * Get scope
             * @type {App}
             */
            var scope = this.setting.scope;

            /**
             * Get create update site route
             * @type {{string[]}}
             */
            var route = scope.config.routes.publishSiteStorage,
                key = scope.controller.root().model.getConfig('appName'),
                opts = {

                    dataType: 'json',

                    url: route[0] + key,
                    method: route[1],

                    data: scope.controller.prepareXhrData({
                        author_site_storage: {
                            content: value
                        }
                    })
                };

            $.ajax(opts).done(function (data, type, xhr) {

                scope.logger.debug(
                    'Save successfully',
                    [key, value]
                );

                this.setting.storage.cache.setItem(key, value);

                scope.logger.debug(data.notice, arguments);
                scope.observer.publish(
                    scope.eventmanager.eventList.updateStorageVersion,
                    data.version
                );

            }.bind(this));
        }
    });
});