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
  'plugins/widgets/pornhub/element/pornhub.element',
  'plugins/widgets/pornhub/element/pornhub.preferences.element',
  'plugins/widgets/pornhub/element/pornhub.rules.element'
], function definePornhubView(BaseView, Header, Footer, PornhubElement,
    PornhubPreferencesElement, PornhubRulesElement) {

  /**
   * Define view
   * @class PornhubView
   * @extends BaseView
   * @constructor
   */
  var PornhubView = function PornhubView() {
  };

  return PornhubView.extend('PornhubView', {

    /**
     * Render Pornhub element
     * @memberOf PornhubView
     */
    renderPornhub: function renderPornhub() {

      this.header(Header, this.get$container());

      /**
       * Define $pornhub
       * @type {PornhubElement}
       */
      this.elements.$pornhub = new PornhubElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf PornhubView
     * @returns {PornhubPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Pornhub Preferences Element
       * @type {PornhubPreferencesElement}
       */
      this.elements.$preferences = new PornhubPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf PornhubView
     * @param widgetRules
     * @param contentRules
     * @returns {PornhubRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Pornhub Rules Element
       * @type {PornhubRulesElement}
       */
      this.elements.$rules = new PornhubRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Pornhub
     * @memberOf PornhubView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderPornhub.bind(this)
      );
    }

  }, BaseView.prototype)

});
