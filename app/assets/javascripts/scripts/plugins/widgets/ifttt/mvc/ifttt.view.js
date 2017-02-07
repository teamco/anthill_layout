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
  'plugins/widgets/ifttt/element/ifttt.element',
  'plugins/widgets/ifttt/element/ifttt.preferences.element',
  'plugins/widgets/ifttt/element/ifttt.rules.element'
], function defineIftttView(BaseView, Header, Footer, IftttElement,
    IftttPreferencesElement, IftttRulesElement) {

  /**
   * Define view
   * @class IftttView
   * @extends BaseView
   * @constructor
   */
  var IftttView = function IftttView() {
  };

  return IftttView.extend('IftttView', {

    /**
     * Render Ifttt element
     * @memberOf IftttView
     */
    renderIfttt: function renderIfttt() {

      this.header(Header, this.get$container());

      /**
       * Define $ifttt
       * @type {IftttElement}
       */
      this.elements.$ifttt = new IftttElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf IftttView
     * @returns {IftttPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Ifttt Preferences Element
       * @type {IftttPreferencesElement}
       */
      this.elements.$preferences = new IftttPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf IftttView
     * @param widgetRules
     * @param contentRules
     * @returns {IftttRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Ifttt Rules Element
       * @type {IftttRulesElement}
       */
      this.elements.$rules = new IftttRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Ifttt
     * @memberOf IftttView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderIfttt.bind(this)
      );
    }

  }, BaseView.prototype);
});
