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
  'plugins/widgets/wikimapia/element/wikimapia.element',
  'plugins/widgets/wikimapia/element/wikimapia.preferences.element',
  'plugins/widgets/wikimapia/element/wikimapia.rules.element'
], function defineWikimapiaView(BaseView, Header, Footer, WikimapiaElement,
    WikimapiaPreferencesElement, WikimapiaRulesElement) {

  /**
   * Define view
   * @class WikimapiaView
   * @extends BaseView
   * @constructor
   */
  var WikimapiaView = function WikimapiaView() {
  };

  return WikimapiaView.extend('WikimapiaView', {

    /**
     * Render Wikimapia element
     * @memberOf WikimapiaView
     */
    renderWikimapia: function renderWikimapia() {

      this.header(Header, this.get$container());

      /**
       * Define $wikimapia
       * @type {WikimapiaElement}
       */
      this.elements.$wikimapia = new WikimapiaElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf WikimapiaView
     * @returns {WikimapiaPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Wikimapia Preferences Element
       * @type {WikimapiaPreferencesElement}
       */
      this.elements.$preferences = new WikimapiaPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf WikimapiaView
     * @param widgetRules
     * @param contentRules
     * @returns {WikimapiaRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Wikimapia Rules Element
       * @type {WikimapiaRulesElement}
       */
      this.elements.$rules = new WikimapiaRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Wikimapia
     * @memberOf WikimapiaView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderWikimapia.bind(this)
      );
    }

  }, BaseView.prototype);
});
