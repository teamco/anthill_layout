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
  'plugins/widgets/verse/element/verse.element',
  'plugins/widgets/verse/element/verse.preferences.element',
  'plugins/widgets/verse/element/verse.rules.element'
], function defineVerseView(BaseView, Header, Footer, VerseElement,
    VersePreferencesElement, VerseRulesElement) {

  /**
   * Define view
   * @class VerseView
   * @extends BaseView
   * @constructor
   */
  var VerseView = function VerseView() {
  };

  return VerseView.extend('VerseView', {

    /**
     * Render Verse element
     * @memberOf VerseView
     */
    renderVerse: function renderVerse() {

      this.header(Header, this.get$container());

      /**
       * Define $verse
       * @type {VerseElement}
       */
      this.elements.$verse = new VerseElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf VerseView
     * @returns {VersePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Verse Preferences Element
       * @type {VersePreferencesElement}
       */
      this.elements.$preferences = new VersePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf VerseView
     * @param widgetRules
     * @param contentRules
     * @returns {VerseRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Verse Rules Element
       * @type {VerseRulesElement}
       */
      this.elements.$rules = new VerseRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Verse
     * @memberOf VerseView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderVerse.bind(this)
      );
    }

  }, BaseView.prototype);
});
