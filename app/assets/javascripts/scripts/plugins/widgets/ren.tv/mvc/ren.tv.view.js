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
  'plugins/widgets/ren.tv/element/ren.tv.element',
  'plugins/widgets/ren.tv/element/ren.tv.preferences.element',
  'plugins/widgets/ren.tv/element/ren.tv.rules.element'
], function defineRenTvView(BaseView, Header, Footer, RenTvElement,
    RenTvPreferencesElement, RenTvRulesElement) {

  /**
   * Define view
   * @class RenTvView
   * @extends BaseView
   * @constructor
   */
  var RenTvView = function RenTvView() {
  };

  return RenTvView.extend('RenTvView', {

    /**
     * Render RenTv element
     * @memberOf RenTvView
     */
    renderRenTv: function renderRenTv() {

      this.header(Header, this.get$container());

      /**
       * Define $rentv
       * @type {RenTvElement}
       */
      this.elements.$rentv = new RenTvElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf RenTvView
     * @returns {RenTvPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define RenTv Preferences Element
       * @type {RenTvPreferencesElement}
       */
      this.elements.$preferences = new RenTvPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf RenTvView
     * @param widgetRules
     * @param contentRules
     * @returns {RenTvRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define RenTv Rules Element
       * @type {RenTvRulesElement}
       */
      this.elements.$rules = new RenTvRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render RenTv
     * @memberOf RenTvView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderRenTv.bind(this)
      );
    }

  }, BaseView.prototype);
});
