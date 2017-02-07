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
  'plugins/widgets/sway/element/sway.element',
  'plugins/widgets/sway/element/sway.preferences.element',
  'plugins/widgets/sway/element/sway.rules.element'
], function defineSwayView(BaseView, Header, Footer, SwayElement,
    SwayPreferencesElement, SwayRulesElement) {

  /**
   * Define view
   * @class SwayView
   * @extends BaseView
   * @constructor
   */
  var SwayView = function SwayView() {
  };

  return SwayView.extend('SwayView', {

    /**
     * Render Sway element
     * @memberOf SwayView
     */
    renderSway: function renderSway() {

      this.header(Header, this.get$container());

      /**
       * Define $sway
       * @type {SwayElement}
       */
      this.elements.$sway = new SwayElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SwayView
     * @returns {SwayPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Sway Preferences Element
       * @type {SwayPreferencesElement}
       */
      this.elements.$preferences = new SwayPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SwayView
     * @param widgetRules
     * @param contentRules
     * @returns {SwayRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Sway Rules Element
       * @type {SwayRulesElement}
       */
      this.elements.$rules = new SwayRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Sway
     * @memberOf SwayView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSway.bind(this)
      );
    }

  }, BaseView.prototype);
});
