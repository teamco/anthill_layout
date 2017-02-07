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
  'plugins/widgets/tvi/element/tvi.element',
  'plugins/widgets/tvi/element/tvi.preferences.element',
  'plugins/widgets/tvi/element/tvi.rules.element'
], function defineTviView(BaseView, Header, Footer, TviElement,
    TviPreferencesElement, TviRulesElement) {

  /**
   * Define view
   * @class TviView
   * @extends BaseView
   * @constructor
   */
  var TviView = function TviView() {
  };

  return TviView.extend('TviView', {

    /**
     * Render tvi element
     * @memberOf TviView
     */
    renderTvi: function renderTvi() {

      this.header(Header, this.get$container());

      /**
       * Define $tvi
       * @type {TviElement}
       */
      this.elements.$tvi = new TviElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf TviView
     * @returns {TviPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Tvi Preferences Element
       * @type {TviPreferencesElement}
       */
      this.elements.$preferences = new TviPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf TviView
     * @param widgetRules
     * @param contentRules
     * @returns {TviRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define Tvi Rules Element
       * @type {TviRulesElement}
       */
      this.elements.$rules = new TviRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render tvi
     * @memberOf TviView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderTvi.bind(this)
      );
    }

  }, BaseView.prototype)

});
