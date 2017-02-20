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
  'plugins/widgets/sap.openui/element/sap.openui.element',
  'plugins/widgets/sap.openui/element/sap.openui.preferences.element',
  'plugins/widgets/sap.openui/element/sap.openui.rules.element'
], function defineSapOpenuiView(BaseView, Header, Footer, SapOpenuiElement,
    SapOpenuiPreferencesElement, SapOpenuiRulesElement) {

  /**
   * Define view
   * @class SapOpenuiView
   * @extends BaseView
   * @constructor
   */
  var SapOpenuiView = function SapOpenuiView() {
  };

  return SapOpenuiView.extend('SapOpenuiView', {

    /**
     * Render SapOpenui element
     * @memberOf SapOpenuiView
     */
    renderSapOpenui: function renderSapOpenui() {

      this.header(Header, this.get$container());

      /**
       * Define $sapopenui
       * @type {SapOpenuiElement}
       */
      this.elements.$sapopenui = new SapOpenuiElement(this, {
        $container: this.get$container().$,
        id: true
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SapOpenuiView
     * @returns {SapOpenuiPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define SapOpenui Preferences Element
       * @type {SapOpenuiPreferencesElement}
       */
      this.elements.$preferences = new SapOpenuiPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SapOpenuiView
     * @param widgetRules
     * @param contentRules
     * @returns {SapOpenuiRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define SapOpenui Rules Element
       * @type {SapOpenuiRulesElement}
       */
      this.elements.$rules = new SapOpenuiRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render SapOpenui
     * @memberOf SapOpenuiView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSapOpenui.bind(this)
      );
    }

  }, BaseView.prototype);
});
