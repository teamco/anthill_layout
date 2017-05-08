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
  'plugins/widgets/shoudio/element/shoudio.element',
  'plugins/widgets/shoudio/element/shoudio.preferences.element',
  'plugins/widgets/shoudio/element/shoudio.rules.element'
], function defineShoudioView(BaseView, Header, Footer, ShoudioElement,
    ShoudioPreferencesElement, ShoudioRulesElement) {

  /**
   * Define view
   * @class ShoudioView
   * @extends BaseView
   * @constructor
   */
  var ShoudioView = function ShoudioView() {
  };

  return ShoudioView.extend('ShoudioView', {

    /**
     * Render Shoudio element
     * @memberOf ShoudioView
     */
    renderShoudio: function renderShoudio() {

      this.header(Header, this.get$container());

      /**
       * Define $shoudio
       * @type {ShoudioElement}
       */
      this.elements.$shoudio = new ShoudioElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ShoudioView
     * @returns {ShoudioPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Shoudio Preferences Element
       * @type {ShoudioPreferencesElement}
       */
      this.elements.$preferences = new ShoudioPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ShoudioView
     * @param widgetRules
     * @param contentRules
     * @returns {ShoudioRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Shoudio Rules Element
       * @type {ShoudioRulesElement}
       */
      this.elements.$rules = new ShoudioRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Shoudio
     * @memberOf ShoudioView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderShoudio.bind(this)
      );
    }

  }, BaseView.prototype);
});
