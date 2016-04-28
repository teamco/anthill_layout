define(function defineRapidEngagePreferences() {

    /**
     * Define RapidEngage Preferences
     * @class RapidEngagePreferences
     * @extends Renderer
     * @constructor
     */
    var RapidEngagePreferences = function RapidEngagePreferences() {
    };

    return RapidEngagePreferences.extend('RapidEngagePreferences', {

        /**
         * Render RapidEngage
         * @memberOf RapidEngagePreferences
         * @returns {*|jQuery}
         */
        renderRapidEngage: function renderRapidEngage() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{rapidEngageCode, activateRapidEngage}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'rapidEngageCode',
                text: 'RapidEngage Code',
                placeholder: 'Paste RapidEngage Code here',
                disabled: false,
                visible: true,
                value: preferences.rapidEngageCode || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateRapidEngage',
                text: 'Activate',
                checked: preferences.activateRapidEngage,
                value: preferences.activateRapidEngage,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-rapid-engage-prefs" />').append(
                $textarea, $checkbox
            );
        },

        /**
         * Load RapidEngage code
         * @memberOf RapidEngagePreferences
         */
        loadActivateRapidEngage: function loadActivateRapidEngage() {

            this.logger.debug('Load RapidEngage code', arguments);

            /**
             * Get prefs
             * @type {{rapidEngageCode, activateRapidEngage}}
             */
            var preferences = this.model.getConfig('preferences');

            /**
             * Define embed code
             * @type {string}
             */
            var embedCode = preferences.rapidEngageCode || '',
                activate = preferences.activateRapidEngage;

            if (this.controller.isServiceActivated(embedCode, activate)) {
                this.view.get$item().addContent(
                    embedCode
                );
            }
        }
    });
});