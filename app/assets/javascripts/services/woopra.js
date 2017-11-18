defineP(function defineWoopraPreferences() {

  /**
   * Define  Woopra Preferences
   * @class WoopraPreferences
   * @extends Renderer
   * @constructor
   */
  var WoopraPreferences = function WoopraPreferences() {
  };

  return WoopraPreferences.extend('WoopraPreferences', {

    /**
     * Render Woopra
     * @memberOf WoopraPreferences
     * @returns {*|jQuery}
     */
    renderWoopra: function renderWoopra() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{woopraDomainName, activateWoopra}}
       */
      var preferences = workspace.model.getConfig('preferences');

      /**
       * Render input
       * @type {*[]}
       */
      var $textfield = this.renderTextField({
        name: 'woopraDomainName',
        text: 'Domain Name',
        disabled: false,
        visible: true,
        value: preferences.woopraDomainName || '',
        validate: {
          blank: true
        }
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateWoopra',
        text: 'Activate',
        checked: preferences.activateWoopra,
        value: preferences.activateWoopra,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-woopra-prefs" />').append(
          $textfield, $checkbox
      );
    },

    /**
     * Load Woopra Domain Name
     * @memberOf WoopraPreferences
     */
    loadActivateWoopra: function loadActivateWoopra() {

      this.logger.debug('Load Woopra Domain Name', arguments);

      /**
       * Get prefs
       * @type {{woopraDomainName}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get Domain Name
       * @type {string|boolean}
       */
      var domainName = preferences.woopraDomainName,
          activate = preferences.activateWoopra;

      if (this.controller.isServiceActivated(domainName, activate)) {

        (function () {
          var t, i, e, n = window, o = document, a = arguments, s = "script", r = ["config",
            "track", "identify", "visit", "push", "call", "trackForm",
            "trackClick"], c = function () {
            var t, i = this;
            for (i._e = [], t = 0; r.length > t; t++) {
              (function (t) {
                i[t] = function () {
                  return i._e.push(
                      [t].concat(Array.prototype.slice.call(arguments, 0))), i
                }
              })(r[t])
            }
          };
          for (n._w = n._w || {}, t = 0; a.length > t; t++) {
            n._w[a[t]] =
                n[a[t]] = n[a[t]] || new c;
          }
          i = o.createElement(s), i.async = 1, i.src =
              "//static.woopra.com/js/w.js", e =
              o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e)
        })("woopra");

        woopra.config({
          domain: domainName
        });

        woopra.track();
      }
    }
  });
});