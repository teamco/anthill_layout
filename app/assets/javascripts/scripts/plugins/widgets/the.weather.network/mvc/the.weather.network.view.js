/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/View',
  'element/header.element',
  'element/footer.element',
  'plugins/widgets/the.weather.network/element/the.weather.network.element',
  'plugins/widgets/the.weather.network/element/the.weather.network.preferences.element',
  'plugins/widgets/the.weather.network/element/the.weather.network.rules.element'
], function defineTheWeatherNetworkView(BaseView, Header, Footer,
    TheWeatherNetworkElement, TheWeatherNetworkPreferencesElement,
    TheWeatherNetworkRulesElement) {

  /**
   * Define view
   * @class TheWeatherNetworkView
   * @extends BaseView
   * @constructor
   */
  var TheWeatherNetworkView = function TheWeatherNetworkView() {
  };

  return TheWeatherNetworkView.extend('TheWeatherNetworkView', {

    /**
     * Render TheWeatherNetwork element
     * @memberOf TheWeatherNetworkView
     */
    renderTheWeatherNetwork: function renderTheWeatherNetwork() {

      this.header(Header, this.get$container());

      /**
       * Define $theweathernetwork
       * @type {TheWeatherNetworkElement}
       */
      this.elements.$theweathernetwork = new TheWeatherNetworkElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf TheWeatherNetworkView
     * @returns {TheWeatherNetworkPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define TheWeatherNetwork Preferences Element
       * @type {TheWeatherNetworkPreferencesElement}
       */
      this.elements.$preferences =
          new TheWeatherNetworkPreferencesElement(this, {
            data: this.controller.getPreferences()
          });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf TheWeatherNetworkView
     * @param widgetRules
     * @param contentRules
     * @returns {TheWeatherNetworkRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define TheWeatherNetwork Rules Element
       * @type {TheWeatherNetworkRulesElement}
       */
      this.elements.$rules = new TheWeatherNetworkRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render TheWeatherNetwork
     * @memberOf TheWeatherNetworkView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderTheWeatherNetwork.bind(this)
      );
    }

  }, BaseView.prototype);
});
