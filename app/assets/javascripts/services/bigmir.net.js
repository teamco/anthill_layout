define(function defineScriptPreferences() {

    /**
     * Define Bigmir.net Preferences
     * @class BigmirNetPreferences
     * @extends Renderer
     * @constructor
     */
    var BigmirNetPreferences = function BigmirNetPreferences() {
    };

    return BigmirNetPreferences.extend('BigmirNetPreferences', {

        /**
         * Render Script
         * @memberOf BigmirNetPreferences
         * @returns {*|jQuery}
         */
        renderBigmirNet: function renderBigmirNet() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{bigmirNetEmbedCode, activateBigmirNet}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'bigmirNetEmbedCode',
                text: 'Bigmir.net Embed Code',
                disabled: false,
                visible: true,
                value: preferences.bigmirNetEmbedCode || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateBigmirNet',
                text: 'Activate',
                checked: preferences.activateBigmirNet,
                value: preferences.activateBigmirNet,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-bigmir-net-prefs" />').append(
                $textarea, $checkbox
            );
        }
    });
});