defineP(function defineGoogleAnalyticsPreferences() {

  /**
   * Define  Google Analytics Preferences
   * @class GoogleAnalyticsPreferences
   * @extends Renderer
   * @constructor
   */
  var GoogleAnalyticsPreferences = function GoogleAnalyticsPreferences() {
  };

  return GoogleAnalyticsPreferences.extend('GoogleAnalyticsPreferences', {

    /**
     * Render Google Analytics
     * @memberOf GoogleAnalyticsPreferences
     * @returns {*|jQuery}
     */
    renderGoogleAnalytics: function renderGoogleAnalytics() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{googleAnalyticsTrackingId, activateGoogleAnalytics}}
       */
      var preferences = workspace.model.getConfig('preferences');

      /**
       * Render input
       * @type {*[]}
       */
      var $textfield = this.renderTextField({
        name: 'googleAnalyticsTrackingId',
        text: 'Tracking ID',
        disabled: false,
        visible: true,
        value: preferences.googleAnalyticsTrackingId || '',
        validate: {
          mask: /^ua-\d{4,9}-\d{1,4}$/i,
          blank: true
        }
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateGoogleAnalytics',
        text: 'Activate',
        checked: preferences.activateGoogleAnalytics,
        value: preferences.activateGoogleAnalytics,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-google-analytics-prefs" />').append(
          $textfield, $checkbox
      );
    },

    /**
     * Load Google Analytics Tracking Id
     * @memberOf GoogleAnalyticsPreferences
     */
    loadActivateGoogleAnalytics: function loadActivateGoogleAnalytics() {

      this.logger.debug('Load Google Analytics Tracking Id', arguments);

      /**
       * Get prefs
       * @type {{googleAnalyticsTrackingId}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get tracking id
       * @type {string}
       */
      var trackingId = preferences.googleAnalyticsTrackingId,
          activate = preferences.activateGoogleAnalytics;

      if (this.controller.isServiceActivated(trackingId, activate)) {

        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', trackingId]);
        window._gaq.push(['_trackPageview']);

        (function () {
          var ga = document.createElement('script');
          ga.type = 'text/javascript';
          ga.async = true;
          ga.src = ('https:' == document.location.protocol ? 'https://ssl' :
                  'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(ga, s);
        })();
      }
    }
  });
});