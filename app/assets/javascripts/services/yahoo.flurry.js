defineP(function defineScriptPreferences() {

  /**
   * Define Yahoo Flurry Preferences
   * @class YahooFlurryPreferences
   * @extends Renderer
   * @constructor
   */
  var YahooFlurryPreferences = function YahooFlurryPreferences() {
  };

  return YahooFlurryPreferences.extend('YahooFlurryPreferences', {

    /**
     * Render Script
     * @memberOf YahooFlurryPreferences
     * @returns {*|jQuery}
     */
    renderYahooFlurry: function renderYahooFlurry() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{yahooFlurryAppKey, activateYahooFlurry}}
       */
      var preferences = workspace.model.getConfig('preferences');

      var $textarea = this.renderTextArea({
        name: 'yahooFlurryAppKey',
        text: 'Yahoo Flurry Application Key',
        disabled: false,
        visible: true,
        value: preferences.yahooFlurryAppKey || ''
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateYahooFlurry',
        text: 'Activate',
        checked: preferences.activateYahooFlurry,
        value: preferences.activateYahooFlurry,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-bigmir-net-prefs" />').append(
          $textarea, $checkbox
      );
    },

    /**
     * Load Yahoo Flurry code
     * @memberOf YahooFlurryPreferences
     */
    loadActivateYahooFlurry: function loadActivateYahooFlurry() {

      this.logger.debug('Load Yahoo Flurry code', arguments);

      /**
       * Get prefs
       * @type {{yahooFlurryAppKey, activateYahooFlurry}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get Inject Script Code
       * @type {string}
       */
      var yahooFlurryAppKey = preferences.yahooFlurryAppKey,
          activate = preferences.activateYahooFlurry;

      if (this.controller.isServiceActivated(yahooFlurryAppKey, activate)) {

        requireP(
            ['https://cdn.flurry.com/js/flurry.js'],
            function _loadYahooFlurry() {
              FlurryAgent.startSession(yahooFlurryAppKey);
            }
        );
      }
    }
  });
});