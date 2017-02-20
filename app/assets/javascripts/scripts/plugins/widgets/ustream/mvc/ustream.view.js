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
  'plugins/widgets/ustream/element/ustream.element',
  'plugins/widgets/ustream/element/ustream.preferences.element',
  'plugins/widgets/ustream/element/ustream.rules.element'
], function defineUstreamView(BaseView, Header, Footer, UstreamElement,
    UstreamPreferencesElement, UstreamRulesElement) {

  /**
   * Define view
   * @class UstreamView
   * @extends BaseView
   * @constructor
   */
  var UstreamView = function UstreamView() {
  };

  return UstreamView.extend('UstreamView', {

    /**
     * Render ustream element
     * @memberOf UstreamView
     */
    renderUstream: function renderUstream() {

      this.header(Header, this.get$container());

      /**
       * Define $ustream
       * @type {UstreamElement}
       */
      this.elements.$ustream = new UstreamElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf UstreamView
     * @returns {UstreamPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Ustream Preferences Element
       * @type {UstreamPreferencesElement}
       */
      this.elements.$preferences = new UstreamPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf UstreamView
     * @param widgetRules
     * @param contentRules
     * @returns {UstreamRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define Ustream Rules Element
       * @type {UstreamRulesElement}
       */
      this.elements.$rules = new UstreamRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render ustream
     * @memberOf UstreamView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderUstream.bind(this)
      );
    }

  }, BaseView.prototype)

});
