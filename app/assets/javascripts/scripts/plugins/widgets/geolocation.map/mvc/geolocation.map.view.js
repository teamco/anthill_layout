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
  'plugins/widgets/geolocation.map/element/geolocation.map.element',
  'plugins/widgets/geolocation.map/element/geolocation.map.preferences.element',
  'plugins/widgets/geolocation.map/element/geolocation.map.rules.element'
], function defineGeolocationMapView(BaseView, Header, Footer,
    GeolocationMapElement, GeolocationMapPreferencesElement,
    GeolocationMapRulesElement) {

  /**
   * Define view
   * @class GeolocationMapView
   * @extends BaseView
   * @constructor
   */
  let GeolocationMapView = function GeolocationMapView() {
  };

  return GeolocationMapView.extend('GeolocationMapView', {

    /**
     * Render geolocation.map element
     * @memberOf GeolocationMapView
     */
    renderGeolocationMap: function renderGeolocationMap() {

      this.header(Header, this.get$container());

      /**
       * Define $geolocation
       * @type {GeolocationMapElement}
       */
      this.elements.$geolocationmap = new GeolocationMapElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.showPosition();
    },

    /**
     * Render Prefs
     * @memberOf GeolocationMapView
     * @returns {GeolocationMapPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define GeolocationMap Preferences Element
       * @type {GeolocationMapPreferencesElement}
       */
      this.elements.$preferences = new GeolocationMapPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf GeolocationMapView
     * @param widgetRules
     * @param contentRules
     * @returns {GeolocationMapRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      let data = this.controller.getRules();

      /**
       * Define GeolocationMap Rules Element
       * @type {GeolocationMapRulesElement}
       */
      this.elements.$rules = new GeolocationMapRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Show position
     * @memberOf GeolocationMapView
     */
    showPosition: function showPosition() {
      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render geolocation.map
     * @memberOf GeolocationMapView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderGeolocationMap.bind(this)
      );
    }

  }, BaseView.prototype)

});