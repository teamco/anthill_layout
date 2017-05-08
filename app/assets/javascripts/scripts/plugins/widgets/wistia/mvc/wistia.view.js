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
  'plugins/widgets/wistia/element/wistia.element',
  'plugins/widgets/wistia/element/wistia.preferences.element',
  'plugins/widgets/wistia/element/wistia.rules.element'
], function defineWistiaView(BaseView, Header, Footer, WistiaElement,
    WistiaPreferencesElement, WistiaRulesElement) {

  /**
   * Define view
   * @class WistiaView
   * @extends BaseView
   * @constructor
   */
  var WistiaView = function WistiaView() {
  };

  return WistiaView.extend('WistiaView', {

    /**
     * Render Wistia element
     * @memberOf WistiaView
     */
    renderWistia: function renderWistia() {

      this.header(Header, this.get$container());

      /**
       * Define $wistia
       * @type {WistiaElement}
       */
      this.elements.$wistia = new WistiaElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf WistiaView
     * @returns {WistiaPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Wistia Preferences Element
       * @type {WistiaPreferencesElement}
       */
      this.elements.$preferences = new WistiaPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf WistiaView
     * @param widgetRules
     * @param contentRules
     * @returns {WistiaRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Wistia Rules Element
       * @type {WistiaRulesElement}
       */
      this.elements.$rules = new WistiaRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Wistia
     * @memberOf WistiaView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderWistia.bind(this)
      );
    }

  }, BaseView.prototype);
});
