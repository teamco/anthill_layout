define(function defineRollbarNotifierPreferences() {

    /**
     * Define  RollbarNotifier Preferences
     * https://rollbar.com
     * @class RollbarNotifierPreferences
     * @extends Renderer
     * @constructor
     */
    var RollbarNotifierPreferences = function RollbarNotifierPreferences() {
    };

    return RollbarNotifierPreferences.extend('RollbarNotifierPreferences', {

        /**
         * Render RollbarNotifier
         * @memberOf RollbarNotifierPreferences
         * @returns {*|jQuery}
         */
        renderRollbarNotifier: function renderRollbarNotifier() {

            /**
             * Get workspace
             * @type {*|Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get workspace prefs
             * @type {{rollbarNotifierAccessToken, activateRollbarNotifier}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var $textarea = this.renderTextArea({
                name: 'rollbarNotifierAccessToken',
                text: 'Rollbar Notifier Access Token',
                placeholder: 'Paste Rollbar Notifier Access Token here',
                disabled: false,
                visible: true,
                value: preferences.rollbarNotifierAccessToken || ''
            });

            var $checkbox = this.renderCheckbox({
                name: 'activateRollbarNotifier',
                text: 'Activate',
                checked: preferences.activateRollbarNotifier,
                value: preferences.activateRollbarNotifier,
                disabled: false,
                visible: true
            });

            return $('<div class="workspace-rollbar-notifier-prefs" />').append(
                $textarea, $checkbox
            );
        },

        /**
         * Load RollbarNotifier AccessToken
         * @memberOf RollbarNotifierPreferences
         */
        loadActivateRollbarNotifier: function loadActivateRollbarNotifier() {

            // Get scope
            var scope = this;

            scope.logger.debug('Load RollbarNotifier AccessToken', arguments);

            /**
             * Get prefs
             * @type {{rollbarNotifierAccessToken, activateRollbarNotifier}}
             */
            var preferences = scope.model.getConfig('preferences');

            /**
             * Get RollbarNotifier AccessToken
             * @type {string}
             */
            var rollbarNotifierAccessToken = preferences.rollbarNotifierAccessToken,
                activate = preferences.activateRollbarNotifier;

            if (!scope.controller.isServiceActivated(rollbarNotifierAccessToken, activate)) {
                return false;
            }

            var rollbarConfig = {
                accessToken: rollbarNotifierAccessToken,
                captureUncaught: true,
                payload: {
                    environment: "production"
                }
            };

            require(
                ['https://d37gvrvc0wt4s1.cloudfront.net/js/v1.3/rollbar.umd.nojson.min.js'],
                function _loadRollbar(Rollbar) {

                    var rollbar = Rollbar.init(rollbarConfig);
                    scope.logger.debug('Loaded RollbarNotifier', rollbar, arguments);
                }
            );
        }
    });
});