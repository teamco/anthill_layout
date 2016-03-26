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
             * Render slider input
             * @type {*[]}
             */
            var $textfield = this.renderTextField({
                name: 'trackingId',
                text: 'Tracking ID',
                placeholder: 'Paste Tracking ID here',
                disabled: false,
                visible: true,
                value: '',
                validate: {
                    mask: /^ua-\d{4,9}-\d{1,4}$/i,
                    blank: true
                }
            });

            return $('<div class="workspace-google-analytics-prefs" />').append($textfield);
        }
    });
});