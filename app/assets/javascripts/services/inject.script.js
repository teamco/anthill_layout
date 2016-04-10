define(function defineScriptPreferences() {

    /**
     * Define Inject Script Preferences
     * @class InjectScriptPreferences
     * @extends Renderer
     * @constructor
     */
    var InjectScriptPreferences = function InjectScriptPreferences() {
    };

    return InjectScriptPreferences.extend('InjectScriptPreferences', {

        /**
         * Render Script
         * @memberOf InjectScriptPreferences
         * @returns {*|jQuery}
         */
        renderInjectScript: function renderInjectScript() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{injectScriptEmbedCode, activateInjectScript}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'injectScriptEmbedCode',
                text: 'Inject Script Code',
                placeholder: 'Paste Inject Script Embed Code here',
                disabled: false,
                visible: true,
                value: preferences.injectScriptEmbedCode || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateInjectScript',
                text: 'Activate',
                checked: preferences.activateInjectScript,
                value: preferences.activateInjectScript,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-inject-script-prefs" />').append(
                $textarea, $checkbox
            );
        }
    });
});