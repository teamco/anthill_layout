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
  'plugins/widgets/laim.tv/element/laim.tv.element',
  'plugins/widgets/laim.tv/element/laim.tv.preferences.element',
  'plugins/widgets/laim.tv/element/laim.tv.rules.element'
], function defineLaimTvView(BaseView, Header, Footer, LaimTvElement,
    LaimTvPreferencesElement, LaimTvRulesElement) {

  /**
   * Define view
   * @class LaimTvView
   * @extends BaseView
   * @constructor
   */
  var LaimTvView = function LaimTvView() {
  };

  return LaimTvView.extend('LaimTvView', {

    /**
     * Render LaimTv element
     * @memberOf LaimTvView
     */
    renderLaimTv: function renderLaimTv() {

      this.header(Header, this.get$container());

      /**
       * Define $laimtv
       * @type {LaimTvElement}
       */
      this.elements.$laimtv = new LaimTvElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf LaimTvView
     * @returns {LaimTvPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define LaimTv Preferences Element
       * @type {LaimTvPreferencesElement}
       */
      this.elements.$preferences = new LaimTvPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf LaimTvView
     * @param widgetRules
     * @param contentRules
     * @returns {LaimTvRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define LaimTv Rules Element
       * @type {LaimTvRulesElement}
       */
      this.elements.$rules = new LaimTvRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render LaimTv
     * @memberOf LaimTvView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderLaimTv.bind(this)
      );
    }

  }, BaseView.prototype);
});
