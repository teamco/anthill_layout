define(function defineRaygunIO() {

    /**
     * Define RaygunIO Preferences
     * @class RaygunIOPreferences
     * @extends Renderer
     * @constructor
     */
    var RaygunIOPreferences = function RaygunIOPreferences() {
    };

    return RaygunIOPreferences.extend('RaygunIOPreferences', {

        /**
         * Render RaygunIO
         * @memberOf RaygunIOPreferences
         * @returns {*|jQuery}
         */
        raygunIO: function raygunIO() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{raygunIOApiKey, activateRaygunIO}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textfield = this.renderTextField({
                name: 'raygunIOApiKey',
                text: 'Raygun.IO API Key',
                placeholder: 'Paste Raygun.IO API Key here',
                disabled: false,
                visible: true,
                value: preferences.raygunIOApiKey || 'DbFEbP1IlRGv779/A2wo1Q=='
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateRaygunIO',
                text: 'Activate',
                checked: preferences.activateRaygunIO,
                value: preferences.activateRaygunIO,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-raygun-io-prefs" />').append(
                $checkbox, $textfield
            );
        }
    });
});