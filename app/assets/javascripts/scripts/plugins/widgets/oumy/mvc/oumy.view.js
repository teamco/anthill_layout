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
  'plugins/widgets/oumy/element/oumy.element',
  'plugins/widgets/oumy/element/oumy.preferences.element',
  'plugins/widgets/oumy/element/oumy.rules.element'
], function defineOumyView(BaseView, Header, Footer, OumyElement,
    OumyPreferencesElement, OumyRulesElement) {

  /**
   * Define view
   * @class OumyView
   * @extends BaseView
   * @constructor
   */
  var OumyView = function OumyView() {
  };

  return OumyView.extend('OumyView', {

    /**
     * Render Oumy element
     * @memberOf OumyView
     */
    renderOumy: function renderOumy() {

      this.header(Header, this.get$container());

      /**
       * Define $oumy
       * @type {OumyElement}
       */
      this.elements.$oumy = new OumyElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf OumyView
     * @returns {OumyPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Oumy Preferences Element
       * @type {OumyPreferencesElement}
       */
      this.elements.$preferences = new OumyPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf OumyView
     * @param widgetRules
     * @param contentRules
     * @returns {OumyRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Oumy Rules Element
       * @type {OumyRulesElement}
       */
      this.elements.$rules = new OumyRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Oumy
     * @memberOf OumyView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderOumy.bind(this)
      );
    }

  }, BaseView.prototype);
});
