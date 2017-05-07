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
  'plugins/widgets/weather.underground/element/weather.underground.element',
  'plugins/widgets/weather.underground/element/weather.underground.preferences.element',
  'plugins/widgets/weather.underground/element/weather.underground.rules.element'
], function defineWeatherUndergroundView(BaseView, Header, Footer,
    WeatherUndergroundElement, WeatherUndergroundPreferencesElement,
    WeatherUndergroundRulesElement) {

  /**
   * Define view
   * @class WeatherUndergroundView
   * @extends BaseView
   * @constructor
   */
  var WeatherUndergroundView = function WeatherUndergroundView() {
  };

  return WeatherUndergroundView.extend('WeatherUndergroundView', {

    /**
     * Render WeatherUnderground element
     * @memberOf WeatherUndergroundView
     */
    renderWeatherUnderground: function renderWeatherUnderground() {

      this.header(Header, this.get$container());

      /**
       * Define $weatherunderground
       * @type {WeatherUndergroundElement}
       */
      this.elements.$weatherunderground = new WeatherUndergroundElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf WeatherUndergroundView
     * @returns {WeatherUndergroundPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define WeatherUnderground Preferences Element
       * @type {WeatherUndergroundPreferencesElement}
       */
      this.elements.$preferences =
          new WeatherUndergroundPreferencesElement(this, {
            data: this.controller.getPreferences()
          });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf WeatherUndergroundView
     * @param widgetRules
     * @param contentRules
     * @returns {WeatherUndergroundRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define WeatherUnderground Rules Element
       * @type {WeatherUndergroundRulesElement}
       */
      this.elements.$rules = new WeatherUndergroundRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render WeatherUnderground
     * @memberOf WeatherUndergroundView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderWeatherUnderground.bind(this)
      );
    }

  }, BaseView.prototype);
});
