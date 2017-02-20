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
  'plugins/widgets/interlude/element/interlude.element',
  'plugins/widgets/interlude/element/interlude.preferences.element',
  'plugins/widgets/interlude/element/interlude.rules.element'
], function defineInterludeView(BaseView, Header, Footer, InterludeElement,
    InterludePreferencesElement, InterludeRulesElement) {

  /**
   * Define view
   * @class InterludeView
   * @extends BaseView
   * @constructor
   */
  var InterludeView = function InterludeView() {
  };

  return InterludeView.extend('InterludeView', {

    /**
     * Render Interlude element
     * @memberOf InterludeView
     */
    renderInterlude: function renderInterlude() {

      this.header(Header, this.get$container());

      /**
       * Define $interlude
       * @type {InterludeElement}
       */
      this.elements.$interlude = new InterludeElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf InterludeView
     * @returns {InterludePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Interlude Preferences Element
       * @type {InterludePreferencesElement}
       */
      this.elements.$preferences = new InterludePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf InterludeView
     * @param widgetRules
     * @param contentRules
     * @returns {InterludeRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Interlude Rules Element
       * @type {InterludeRulesElement}
       */
      this.elements.$rules = new InterludeRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Interlude
     * @memberOf InterludeView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderInterlude.bind(this)
      );
    }

  }, BaseView.prototype);
});
