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
  'plugins/widgets/sportlive/element/sportlive.element',
  'plugins/widgets/sportlive/element/sportlive.preferences.element',
  'plugins/widgets/sportlive/element/sportlive.rules.element'
], function defineSportliveView(BaseView, Header, Footer, SportliveElement,
    SportlivePreferencesElement, SportliveRulesElement) {

  /**
   * Define view
   * @class SportliveView
   * @extends BaseView
   * @constructor
   */
  var SportliveView = function SportliveView() {
  };

  return SportliveView.extend('SportliveView', {

    /**
     * Render Sportlive element
     * @memberOf SportliveView
     */
    renderSportlive: function renderSportlive() {

      this.header(Header, this.get$container());

      /**
       * Define $sportlive
       * @type {SportliveElement}
       */
      this.elements.$sportlive = new SportliveElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SportliveView
     * @returns {SportlivePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Sportlive Preferences Element
       * @type {SportlivePreferencesElement}
       */
      this.elements.$preferences = new SportlivePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SportliveView
     * @param widgetRules
     * @param contentRules
     * @returns {SportliveRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Sportlive Rules Element
       * @type {SportliveRulesElement}
       */
      this.elements.$rules = new SportliveRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Sportlive
     * @memberOf SportliveView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSportlive.bind(this)
      );
    }

  }, BaseView.prototype);
});
