defineP(function defineDoorbellPreferences() {

  /**
   * Define  Doorbell Preferences
   * @class DoorbellPreferences
   * @extends Renderer
   * @constructor
   */
  var DoorbellPreferences = function DoorbellPreferences() {
  };

  return DoorbellPreferences.extend('DoorbellPreferences', {

    /**
     * Render Doorbell
     * @memberOf DoorbellPreferences
     * @returns {*|jQuery}
     */
    renderDoorbell: function renderDoorbell() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{doorbellAppKey, activateDoorbell}}
       */
      var preferences = workspace.model.getConfig('preferences');

      /**
       * Render input
       * @type {*[]}
       */
      var $textfield = this.renderTextField({
        name: 'doorbellAppKey',
        text: 'App Key',
        disabled: false,
        visible: true,
        value: preferences.doorbellAppKey ||
        'Mw3OcekXyqGyHwqnIkEjd1kUFwgwiersP7hA7bfHcSLgHggYxv9M9uVE0sJtWB0Y',
        validate: {
          blank: true
        }
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateDoorbell',
        text: 'Activate',
        checked: preferences.activateDoorbell,
        value: preferences.activateDoorbell,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-doorbell-prefs" />').append(
          $textfield, $checkbox
      );
    },

    /**
     * Load Doorbell App Key
     * @memberOf DoorbellPreferences
     */
    loadActivateDoorbell: function loadActivateDoorbell() {

      this.logger.debug('Load Doorbell App Key', arguments);

      /**
       * Get prefs
       * @type {{doorbellAppKey}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get App Key
       * @type {string|boolean}
       */
      var appKey = preferences.doorbellAppKey,
          activate = preferences.activateDoorbell;

      if (this.controller.isServiceActivated(appKey, activate)) {

        // Init config
        window.doorbellOptions = {appKey: appKey};

        (function (d, t) {
          var g = d.createElement(t);
          g.id = 'doorbellScript';
          g.type = 'text/javascript';
          g.async = true;
          g.src = 'https://embed.doorbell.io/button/3645?t=' +
              (new Date().getTime());
          (d.getElementsByTagName('head')[0] ||
          d.getElementsByTagName('body')[0]).appendChild(g);
        }(document, 'script'));

      } else {

        // Unset doorbell
        delete window.doorbellOptions;
        $('#doorbellScript').remove();
      }
    }
  });
});