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
  'plugins/widgets/infogr.am/element/infogr.am.element',
  'plugins/widgets/infogr.am/element/infogr.am.preferences.element',
  'plugins/widgets/infogr.am/element/infogr.am.rules.element'
], function defineInfogrAmView(BaseView, Header, Footer, InfogrAmElement,
    InfogrAmPreferencesElement, InfogrAmRulesElement) {

  /**
   * Define view
   * @class InfogrAmView
   * @extends BaseView
   * @constructor
   */
  var InfogrAmView = function InfogrAmView() {
  };

  return InfogrAmView.extend('InfogrAmView', {

    /**
     * Render InfogrAm element
     * @memberOf InfogrAmView
     */
    renderInfogrAm: function renderInfogrAm() {

      this.header(Header, this.get$container());

      /**
       * Define $infogram
       * @type {InfogrAmElement}
       */
      this.elements.$infogram = new InfogrAmElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf InfogrAmView
     * @returns {InfogrAmPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define InfogrAm Preferences Element
       * @type {InfogrAmPreferencesElement}
       */
      this.elements.$preferences = new InfogrAmPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf InfogrAmView
     * @param widgetRules
     * @param contentRules
     * @returns {InfogrAmRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define InfogrAm Rules Element
       * @type {InfogrAmRulesElement}
       */
      this.elements.$rules = new InfogrAmRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render InfogrAm
     * @memberOf InfogrAmView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderInfogrAm.bind(this)
      );
    }

  }, BaseView.prototype);
});
