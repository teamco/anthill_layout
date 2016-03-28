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

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{snapEngageCode, activateSnapEngage}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'snapEngageCode',
                text: 'SnapEngage Code',
                placeholder: 'Paste SnapEngage Code here',
                disabled: false,
                visible: true,
                value: preferences.snapEngageCode || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateSnapEngage',
                text: 'Activate',
                checked: preferences.activateSnapEngage,
                value: preferences.activateSnapEngage,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-snap-engage-prefs" />').append(
                $checkbox, $textarea
            );
        }
    });
});