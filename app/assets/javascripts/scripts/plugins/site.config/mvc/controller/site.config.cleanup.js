/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigCleanup() {

    /**
     * Define SiteConfig Cleanup
     * @class SiteConfigCleanup
     * @constructor
     */
    var SiteConfigCleanup = function SiteConfigCleanup() {

    };

    return SiteConfigCleanup.extend('SiteConfigCleanup', {

        /**
         * Clean up local storage
         * @member SiteConfigCleanup
         */
        cleanUpLocalStorage: function cleanUpLocalStorage() {
            this.view.cleanUpConfirmation();
        },

        /**
         * Approve clean up
         * @member SiteConfigCleanup
         */
        approveCleanUp: function approveCleanUp() {

            /**
             * Define scope
             * @member SiteConfig
             */
            var scope = this.scope,
                $modal = scope.view.elements.$modal;

            if (scope.base.isDefined($modal)) {
                $modal.selfDestroy();
            }

            this.root().model.setting.clear();

            // Reload without cache
            document.location.reload(true);
        }
    });
});