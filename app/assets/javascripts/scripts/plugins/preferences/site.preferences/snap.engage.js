define(function defineSiteConfigSnapEngagePreferences() {

    /**
     * Define SiteConfig SnapEngage Preferences
     * https://www.snapengage.com
     * @class SiteConfigSnapEngagePreferences
     * @extends Renderer
     * @constructor
     */
    var SiteConfigSnapEngagePreferences = function SiteConfigSnapEngagePreferences() {
    };

    return SiteConfigSnapEngagePreferences.extend('SiteConfigSnapEngagePreferences', {

        /**
         * Render SnapEngage
         * @memberOf SiteConfigSnapEngagePreferences
         * @returns {*|jQuery}
         */
        snapEngage: function snapEngage() {

            var $textarea = this.renderTextArea({
                text: 'SnapEngage Code',
                placeholder: 'Paste SnapEngage Code here',
                disabled: false,
                visible: true,
                value: ''
            });

            return $('<div class="workspace-snap-engage-prefs" />').append($textarea);
        }
    });
});