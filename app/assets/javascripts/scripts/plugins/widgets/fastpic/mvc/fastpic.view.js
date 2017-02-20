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
  'plugins/widgets/fastpic/element/fastpic.element',
  'plugins/widgets/fastpic/element/fastpic.preferences.element',
  'plugins/widgets/fastpic/element/fastpic.rules.element'
], function defineFastpicView(BaseView, Header, Footer, FastpicElement,
    FastpicPreferencesElement, FastpicRulesElement) {

  /**
   * Define view
   * @class FastpicView
   * @extends BaseView
   * @constructor
   */
  var FastpicView = function FastpicView() {
  };

  return FastpicView.extend('FastpicView', {

    /**
     * Render Fastpic element
     * @memberOf FastpicView
     */
    renderFastpic: function renderFastpic() {

      this.header(Header, this.get$container());

      /**
       * Define $fastpic
       * @type {FastpicElement}
       */
      this.elements.$fastpic = new FastpicElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf FastpicView
     * @returns {FastpicPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Fastpic Preferences Element
       * @type {FastpicPreferencesElement}
       */
      this.elements.$preferences = new FastpicPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf FastpicView
     * @param widgetRules
     * @param contentRules
     * @returns {FastpicRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Fastpic Rules Element
       * @type {FastpicRulesElement}
       */
      this.elements.$rules = new FastpicRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Fastpic
     * @memberOf FastpicView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderFastpic.bind(this)
      );
    }

  }, BaseView.prototype);
});
