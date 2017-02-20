/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineSkypeElement(PluginElement) {

  /**
   * Define Skype Element
   * @param view
   * @param opts
   * @returns {SkypeElement}
   * @constructor
   * @class SkypeElement
   * @extends PluginElement
   */
  var SkypeElement = function SkypeElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('skype', {resource: '/widgets'});

    return this;
  };

  return SkypeElement.extend('SkypeElement', {

    /**
     * Render Embedded content
     * @memberOf SkypeElement
     * @param {string} bootstrap
     * @param {string} api
     * @param {string} ui
     */
    renderEmbeddedContent: function renderEmbeddedContent(bootstrap, api, ui) {

      /**
       * Get scope
       * @type {Skype}
       */
      var scope = this.view.scope;

      if (!(api && ui)) {

        scope.logger.warn('Undefined API/UI Keys');
        return false;
      }

      require([bootstrap], function _loadSkype() {

        // Reference to SkypeBootstrap.min.js
        // Implements the Skype object model via
        // https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js Call
        // the application object
        var config = {
          apiKey: api,                        // SDK
          apiKeyCC: ui,                       // SDK+UI
          version: 'BuildConference/1.0.0'    // This helps to identify
                                              // telemetry
        };

        Skype.initialize({apiKey: config.apiKey}, function (api) {
          window.skypeWebAppCtor = api.application;
          window.skypeWebApp = new api.application();
          //Make sign in table appear
          $(".menu #sign-in").click();
          // whenever client.state changes, display its value
          window.skypeWebApp.signInManager.state.changed(function (state) {
            $('#client_state').text(state);
          });
        }, function (err) {
          console.log(err);
          alert('Cannot load the SDK.');
        });

        // Sign-in code typically follows here.
      });
    }

  }, PluginElement.prototype);
});
