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
  'plugins/widgets/rdio/element/rdio.element',
  'plugins/widgets/rdio/element/rdio.preferences.element',
  'plugins/widgets/rdio/element/rdio.rules.element'
], function defineRdioView(BaseView, Header, Footer, RdioElement,
    RdioPreferencesElement, RdioRulesElement) {

  /**
   * Define view
   * @class RdioView
   * @extends BaseView
   * @constructor
   */
  var RdioView = function RdioView() {
  };

  return RdioView.extend('RdioView', {

    /**
     * Render rdio element
     * @memberOf RdioView
     */
    renderRdio: function renderRdio() {

      this.header(Header, this.get$container());

      /**
       * Define $rdio
       * @type {RdioElement}
       */
      this.elements.$rdio = new RdioElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf RdioView
     * @returns {RdioPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Rdio Preferences Element
       * @type {RdioPreferencesElement}
       */
      this.elements.$preferences = new RdioPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf RdioView
     * @param widgetRules
     * @param contentRules
     * @returns {RdioRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define Rdio Rules Element
       * @type {RdioRulesElement}
       */
      this.elements.$rules = new RdioRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render rdio
     * @memberOf RdioView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderRdio.bind(this)
      );
    }

  }, BaseView.prototype)

});
