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
  'plugins/widgets/fresh.tv/element/fresh.tv.element',
  'plugins/widgets/fresh.tv/element/fresh.tv.preferences.element',
  'plugins/widgets/fresh.tv/element/fresh.tv.rules.element'
], function defineFreshTvView(BaseView, Header, Footer, FreshTvElement,
    FreshTvPreferencesElement, FreshTvRulesElement) {

  /**
   * Define view
   * @class FreshTvView
   * @extends BaseView
   * @constructor
   */
  var FreshTvView = function FreshTvView() {
  };

  return FreshTvView.extend('FreshTvView', {

    /**
     * Render freshtv element
     * @memberOf FreshTvView
     */
    renderFreshTv: function renderFreshTv() {

      this.header(Header, this.get$container());

      /**
       * Define $freshtv
       * @type {FreshTvElement}
       */
      this.elements.$freshtv = new FreshTvElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf FreshTvView
     * @returns {FreshTvPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define FreshTv Preferences Element
       * @type {FreshTvPreferencesElement}
       */
      this.elements.$preferences = new FreshTvPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf FreshTvView
     * @param widgetRules
     * @param contentRules
     * @returns {FreshTvRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define FreshTv Rules Element
       * @type {FreshTvRulesElement}
       */
      this.elements.$rules = new FreshTvRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render freshtv
     * @memberOf FreshTvView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderFreshTv.bind(this)
      );
    }

  }, BaseView.prototype)

});
