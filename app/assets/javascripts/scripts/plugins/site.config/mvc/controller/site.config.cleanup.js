/**
 * Created by teamco on 11/4/14.
 */
define(function defineSiteConfigCleanup() {

    /**
     * Define SiteConfig Cleanup
     * @class SiteConfigCleanup
     * @extends BaseController
     * @constructor
     */
    var SiteConfigCleanup = function SiteConfigCleanup() {
    };

    return SiteConfigCleanup.extend('SiteConfigCleanup', {

        /**
         * Clean up local storage
         * @memberOf SiteConfigCleanup
         */
        cleanUpLocalStorage: function cleanUpLocalStorage() {

            /**
             * Get scope
             * @type {SiteConfigCleanup}
             */
            var scope = this;

            scope.view.cleanUpConfirmation();

            scope.eventmanager.subscribePublishOn(
                scope.controller.root(),
                function _afterUpdateStorageCallback() {

                    scope.controller.approveActivate(
                        function _reloadSite() {

                            // Reload without cache
                            document.location.reload(true);
                        }
                    );
                }
            );
        },

        /**
         * Approve clean up
         * @memberOf SiteConfigCleanup
         */
        approveCleanUp: function approveCleanUp() {

            /**
             * Define scope
             * @memberOf SiteConfig
             */
            var scope = this.scope,
                $modal = scope.view.elements.$modal;

            if (scope.base.isDefined($modal)) {
                $modal.selfDestroy();
            }

            /**
             * Get root
             * @type {Application}
             */
            var root = this.root();

            root.model.setting.clear();
        }
    });
});