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
  'plugins/widgets/sinoptik/element/sinoptik.element',
  'plugins/widgets/sinoptik/element/sinoptik.preferences.element',
  'plugins/widgets/sinoptik/element/sinoptik.rules.element'
], function defineSinoptikView(BaseView, Header, Footer, SinoptikElement,
    SinoptikPreferencesElement, SinoptikRulesElement) {

  /**
   * Define view
   * @class SinoptikView
   * @extends BaseView
   * @constructor
   */
  var SinoptikView = function SinoptikView() {
  };

  return SinoptikView.extend('SinoptikView', {

    /**
     * Render Sinoptik element
     * @memberOf SinoptikView
     */
    renderSinoptik: function renderSinoptik() {

      this.header(Header, this.get$container());

      /**
       * Define $sinoptik
       * @type {SinoptikElement}
       */
      this.elements.$sinoptik = new SinoptikElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SinoptikView
     * @returns {SinoptikPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Sinoptik Preferences Element
       * @type {SinoptikPreferencesElement}
       */
      this.elements.$preferences = new SinoptikPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SinoptikView
     * @param widgetRules
     * @param contentRules
     * @returns {SinoptikRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Sinoptik Rules Element
       * @type {SinoptikRulesElement}
       */
      this.elements.$rules = new SinoptikRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Sinoptik
     * @memberOf SinoptikView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSinoptik.bind(this)
      );
    }

  }, BaseView.prototype);
});
