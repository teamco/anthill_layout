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
  'plugins/widgets/dotsub/element/dotsub.element',
  'plugins/widgets/dotsub/element/dotsub.preferences.element',
  'plugins/widgets/dotsub/element/dotsub.rules.element'
], function defineDotsubView(BaseView, Header, Footer, DotsubElement,
    DotsubPreferencesElement, DotsubRulesElement) {

  /**
   * Define view
   * @class DotsubView
   * @extends BaseView
   * @constructor
   */
  var DotsubView = function DotsubView() {
  };

  return DotsubView.extend('DotsubView', {

    /**
     * Render Dotsub element
     * @memberOf DotsubView
     */
    renderDotsub: function renderDotsub() {

      this.header(Header, this.get$container());

      /**
       * Define $dotsub
       * @type {DotsubElement}
       */
      this.elements.$dotsub = new DotsubElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf DotsubView
     * @returns {DotsubPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Dotsub Preferences Element
       * @type {DotsubPreferencesElement}
       */
      this.elements.$preferences = new DotsubPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf DotsubView
     * @param widgetRules
     * @param contentRules
     * @returns {DotsubRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Dotsub Rules Element
       * @type {DotsubRulesElement}
       */
      this.elements.$rules = new DotsubRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Dotsub
     * @memberOf DotsubView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderDotsub.bind(this)
      );
    }

  }, BaseView.prototype);
});
