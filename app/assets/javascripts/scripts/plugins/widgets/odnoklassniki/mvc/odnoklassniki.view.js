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
  'plugins/widgets/odnoklassniki/element/odnoklassniki.element',
  'plugins/widgets/odnoklassniki/element/odnoklassniki.preferences.element',
  'plugins/widgets/odnoklassniki/element/odnoklassniki.rules.element'
], function defineOdnoklassnikiView(BaseView, Header, Footer,
    OdnoklassnikiElement, OdnoklassnikiPreferencesElement,
    OdnoklassnikiRulesElement) {

  /**
   * Define view
   * @class OdnoklassnikiView
   * @extends BaseView
   * @constructor
   */
  var OdnoklassnikiView = function OdnoklassnikiView() {
  };

  return OdnoklassnikiView.extend('OdnoklassnikiView', {

    /**
     * Render Odnoklassniki element
     * @memberOf OdnoklassnikiView
     */
    renderOdnoklassniki: function renderOdnoklassniki() {

      this.header(Header, this.get$container());

      /**
       * Define $odnoklassniki
       * @type {OdnoklassnikiElement}
       */
      this.elements.$odnoklassniki = new OdnoklassnikiElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf OdnoklassnikiView
     * @returns {OdnoklassnikiPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Odnoklassniki Preferences Element
       * @type {OdnoklassnikiPreferencesElement}
       */
      this.elements.$preferences = new OdnoklassnikiPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf OdnoklassnikiView
     * @param widgetRules
     * @param contentRules
     * @returns {OdnoklassnikiRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Odnoklassniki Rules Element
       * @type {OdnoklassnikiRulesElement}
       */
      this.elements.$rules = new OdnoklassnikiRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Odnoklassniki
     * @memberOf OdnoklassnikiView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderOdnoklassniki.bind(this)
      );
    }

  }, BaseView.prototype);
});
