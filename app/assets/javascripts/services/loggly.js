defineP(function defineLogglyPreferences() {

  /**
   * Define Loggly Preferences
   * @class LogglyPreferences
   * @extends Renderer
   * @constructor
   */
  var LogglyPreferences = function LogglyPreferences() {
  };

  return LogglyPreferences.extend('LogglyPreferences', {

    /**
     * Render Loggly
     * @memberOf LogglyPreferences
     * @returns {*|jQuery}
     */
    renderLoggly: function renderLoggly() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{logglyEmbedCode, activateLoggly}}
       */
      var preferences = workspace.model.getConfig('preferences');

      /**
       * Render input
       * @type {*[]}
       */
      var $textfield = this.renderTextArea({
        name: 'logglyEmbedCode',
        text: 'Embed Code',
        disabled: false,
        visible: true,
        value: preferences.logglyEmbedCode,
        validate: {
          blank: true
        }
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateLoggly',
        text: 'Activate',
        checked: preferences.activateLoggly,
        value: preferences.activateLoggly,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-loggly-prefs" />').append(
          $textfield, $checkbox
      );
    },

    /**
     * Load Loggly EmbedCode
     * @memberOf LogglyPreferences
     */
    loadActivateLoggly: function loadActivateLoggly() {

      this.logger.debug('Load Loggly Embed Code', arguments);

      /**
       * Get prefs
       * @type {{logglyEmbedCode}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get embedCode
       * @type {string|boolean}
       */
      var embedCode = preferences.logglyEmbedCode,
          activate = preferences.activateLoggly;

      if (this.controller.isServiceActivated(embedCode, activate)) {

        // Fetch key
        var matcher = embedCode.match(
            /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/);

        if (!matcher) {
          this.logger.warn('Unable to fetch Loggly key');
          return false;
        }

        requireP(['http://cloudfront.loggly.com/js/loggly.tracker-2.1.min.js'],
            function _loadLoggly() {

              var _LTracker = window._LTracker || [];
              _LTracker.push({
                'logglyKey': matcher[0],
                'sendConsoleErrors': true,
                'tag': 'loggly-jslogger'
              });
            });
      }
    }
  });
});