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
  'plugins/widgets/hromadske.tv/element/hromadske.tv.element',
  'plugins/widgets/hromadske.tv/element/hromadske.tv.preferences.element',
  'plugins/widgets/hromadske.tv/element/hromadske.tv.rules.element'
], function defineHromadskeTvView(BaseView, Header, Footer, HromadskeTvElement,
    HromadskeTvPreferencesElement, HromadskeTvRulesElement) {

  /**
   * Define view
   * @class HromadskeTvView
   * @extends BaseView
   * @constructor
   */
  var HromadskeTvView = function HromadskeTvView() {
  };

  return HromadskeTvView.extend('HromadskeTvView', {

    /**
     * Render hromadsketv element
     * @memberOf HromadskeTvView
     */
    renderHromadskeTv: function renderHromadskeTv() {

      this.header(Header, this.get$container());

      /**
       * Define $hromadsketv
       * @type {HromadskeTvElement}
       */
      this.elements.$hromadsketv = new HromadskeTvElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf HromadskeTvView
     * @returns {HromadskeTvPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define HromadskeTv Preferences Element
       * @type {HromadskeTvPreferencesElement}
       */
      this.elements.$preferences = new HromadskeTvPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf HromadskeTvView
     * @param widgetRules
     * @param contentRules
     * @returns {HromadskeTvRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define HromadskeTv Rules Element
       * @type {HromadskeTvRulesElement}
       */
      this.elements.$rules = new HromadskeTvRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render hromadsketv
     * @memberOf HromadskeTvView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderHromadskeTv.bind(this)
      );
    }

  }, BaseView.prototype)

});
