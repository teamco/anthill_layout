define(function defineSiteConfigGoogleAnalyticsPreferences() {

    /**
     * Define SiteConfig Google Analytics Preferences
     * @class SiteConfigGoogleAnalyticsPreferences
     * @extends Renderer
     * @constructor
     */
    var SiteConfigGoogleAnalyticsPreferences = function SiteConfigGoogleAnalyticsPreferences() {
    };

    return SiteConfigGoogleAnalyticsPreferences.extend('SiteConfigGoogleAnalyticsPreferences', {

        /**
         * Render Google Analytics
         * @memberOf SiteConfigGoogleAnalyticsPreferences
         * @returns {*|jQuery}
         */
        googleAnalytics: function googleAnalytics() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{googleAnalyticsTrackingId}}
             */
            var preferences = workspace.model.getConfig('preferences');

            /**
             * Render slider input
             * @type {*[]}
             */
            var $textfield = this.renderTextField({
                name: 'googleAnalyticsTrackingId',
                text: 'Tracking ID',
                placeholder: 'Paste Tracking ID here',
                disabled: false,
                visible: true,
                value: preferences.googleAnalyticsTrackingId || '',
                validate: {
                    mask: /^ua-\d{4,9}-\d{1,4}$/i,
                    blank: true
                }
            });

            return $('<div class="workspace-google-analytics-prefs" />').append(
                $textfield
            );
        }
    });
});