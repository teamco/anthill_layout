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
  'plugins/widgets/instagram/element/instagram.element',
  'plugins/widgets/instagram/element/instagram.preferences.element',
  'plugins/widgets/instagram/element/instagram.rules.element'
], function defineInstagramView(BaseView, Header, Footer, InstagramElement,
    InstagramPreferencesElement, InstagramRulesElement) {

  /**
   * Define view
   * @class InstagramView
   * @extends BaseView
   * @constructor
   */
  var InstagramView = function InstagramView() {
  };

  return InstagramView.extend('InstagramView', {

    /**
     * Render Instagram element
     * @memberOf InstagramView
     */
    renderInstagram: function renderInstagram() {

      this.header(Header, this.get$container());

      /**
       * Define $instagram
       * @type {InstagramElement}
       */
      this.elements.$instagram = new InstagramElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf InstagramView
     * @returns {InstagramPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Instagram Preferences Element
       * @type {InstagramPreferencesElement}
       */
      this.elements.$preferences = new InstagramPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf InstagramView
     * @param widgetRules
     * @param contentRules
     * @returns {InstagramRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Instagram Rules Element
       * @type {InstagramRulesElement}
       */
      this.elements.$rules = new InstagramRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Instagram
     * @memberOf InstagramView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderInstagram.bind(this)
      );
    }

  }, BaseView.prototype)

});
