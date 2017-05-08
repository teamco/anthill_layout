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
  'plugins/widgets/codepoints/element/codepoints.element',
  'plugins/widgets/codepoints/element/codepoints.preferences.element',
  'plugins/widgets/codepoints/element/codepoints.rules.element'
], function defineCodepointsView(BaseView, Header, Footer, CodepointsElement,
    CodepointsPreferencesElement, CodepointsRulesElement) {

  /**
   * Define view
   * @class CodepointsView
   * @extends BaseView
   * @constructor
   */
  var CodepointsView = function CodepointsView() {
  };

  return CodepointsView.extend('CodepointsView', {

    /**
     * Render Codepoints element
     * @memberOf CodepointsView
     */
    renderCodepoints: function renderCodepoints() {

      this.header(Header, this.get$container());

      /**
       * Define $codepoints
       * @type {CodepointsElement}
       */
      this.elements.$codepoints = new CodepointsElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf CodepointsView
     * @returns {CodepointsPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Codepoints Preferences Element
       * @type {CodepointsPreferencesElement}
       */
      this.elements.$preferences = new CodepointsPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf CodepointsView
     * @param widgetRules
     * @param contentRules
     * @returns {CodepointsRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Codepoints Rules Element
       * @type {CodepointsRulesElement}
       */
      this.elements.$rules = new CodepointsRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Codepoints
     * @memberOf CodepointsView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderCodepoints.bind(this)
      );
    }

  }, BaseView.prototype);
});
