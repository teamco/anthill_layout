define(function defineSnapEngagePreferences() {

    /**
     * Define  SnapEngage Preferences
     * https://www.snapengage.com
     * @class SnapEngagePreferences
     * @extends Renderer
     * @constructor
     */
    var SnapEngagePreferences = function SnapEngagePreferences() {
    };

    return SnapEngagePreferences.extend('SnapEngagePreferences', {

        /**
         * Render SnapEngage
         * @memberOf SnapEngagePreferences
         * @returns {*|jQuery}
         */
        renderSnapEngage: function renderSnapEngage() {

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
                $textarea, $checkbox
            );
        },

        /**
         * Load SnapEngage Code
         * @memberOf SnapEngagePreferences
         */
        loadActivateSnapEngage: function loadActivateSnapEngage() {

            this.logger.debug('Load SnapEngage Code', arguments);

            /**
             * Get prefs
             * @type {{snapEngageCode, activateSnapEngage}}
             */
            var preferences = this.model.getConfig('preferences');

            /**
             * Get SnapEngage Code
             * @type {string}
             */
            var snapEngageCode = preferences.snapEngageCode,
                activate = preferences.activateSnapEngage;

            if (!this.controller.isServiceActivated(snapEngageCode, activate)) {

                this.logger.debug('Remove SnapEngage', snapEngageCode);
                $('[id^=SnapABug]').remove();
                return false;
            }

            // Get uuid key
            var code = snapEngageCode.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

            if (!code) {
                this.logger.debug('Unable to fetch SnapEngage Code UUID', snapEngageCode);
                return false;
            }

            (function () {
                var se = document.createElement('script');
                se.type = 'text/javascript';
                se.async = true;
                se.src = '//storage.googleapis.com/code.snapengage.com/js/' + code[0] + '.js';
                var done = false;
                se.onload = se.onreadystatechange = function () {
                    if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                        done = true;
                        /* Place your SnapEngage JS API code below */
                        /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
                    }
                };
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(se, s);
            })();
        }
    });
});