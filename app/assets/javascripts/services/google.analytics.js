define(function defineGoogleAnalyticsPreferences() {

    /**
     * Define  Google Analytics Preferences
     * @class GoogleAnalyticsPreferences
     * @extends Renderer
     * @constructor
     */
    var GoogleAnalyticsPreferences = function GoogleAnalyticsPreferences() {
    };

    return GoogleAnalyticsPreferences.extend('GoogleAnalyticsPreferences', {

        /**
         * Render Google Analytics
         * @memberOf GoogleAnalyticsPreferences
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
             * @type {{googleAnalyticsTrackingId, activateGoogleAnalytics}}
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

            var $checkbox = this.renderCheckbox({
                name: 'activateGoogleAnalytics',
                text: 'Activate',
                checked: preferences.activateGoogleAnalytics,
                value: preferences.activateGoogleAnalytics,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-google-analytics-prefs" />').append(
                $textfield, $checkbox
            );
        }
    });
});