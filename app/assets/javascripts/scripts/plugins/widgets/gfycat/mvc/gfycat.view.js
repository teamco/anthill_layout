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
  'plugins/widgets/gfycat/element/gfycat.element',
  'plugins/widgets/gfycat/element/gfycat.preferences.element',
  'plugins/widgets/gfycat/element/gfycat.rules.element'
], function defineGfycatView(BaseView, Header, Footer, GfycatElement,
    GfycatPreferencesElement, GfycatRulesElement) {

  /**
   * Define view
   * @class GfycatView
   * @extends BaseView
   * @constructor
   */
  var GfycatView = function GfycatView() {
  };

  return GfycatView.extend('GfycatView', {

    /**
     * Render Gfycat element
     * @memberOf GfycatView
     */
    renderGfycat: function renderGfycat() {

      this.header(Header, this.get$container());

      /**
       * Define $gfycat
       * @type {GfycatElement}
       */
      this.elements.$gfycat = new GfycatElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf GfycatView
     * @returns {GfycatPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Gfycat Preferences Element
       * @type {GfycatPreferencesElement}
       */
      this.elements.$preferences = new GfycatPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf GfycatView
     * @param widgetRules
     * @param contentRules
     * @returns {GfycatRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Gfycat Rules Element
       * @type {GfycatRulesElement}
       */
      this.elements.$rules = new GfycatRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Gfycat
     * @memberOf GfycatView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderGfycat.bind(this)
      );
    }

  }, BaseView.prototype);
});
