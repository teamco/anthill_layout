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
    },

    /**
     * Load inject script code
     * @memberOf InjectScriptPreferences
     */
    loadActivateInjectScript: function loadActivateInjectScript() {

      this.logger.debug('Load inject script code', arguments);

      /**
       * Get prefs
       * @type {{injectScriptEmbedCode, activateInjectScript}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get Inject Script Code
       * @type {string}
       */
      var injectScriptCode = preferences.injectScriptEmbedCode,
          activate = preferences.activateInjectScript;

      if (!this.controller.isServiceActivated(injectScriptCode, activate)) {
        return false;
      }

      try {

        /**
         * Define function
         * @type {Function}
         */
        var mainScript = new window.Function(injectScriptCode);

        // Run script
        mainScript();

      } catch (e) {

        this.logger.warn('Unable to execute script', injectScriptCode, e);
      }
    }
  });
});