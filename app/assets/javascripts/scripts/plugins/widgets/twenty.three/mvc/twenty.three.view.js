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
  'plugins/widgets/twenty.three/element/twenty.three.element',
  'plugins/widgets/twenty.three/element/twenty.three.preferences.element',
  'plugins/widgets/twenty.three/element/twenty.three.rules.element'
], function defineTwentyThreeView(BaseView, Header, Footer, TwentyThreeElement,
    TwentyThreePreferencesElement, TwentyThreeRulesElement) {

  /**
   * Define view
   * @class TwentyThreeView
   * @extends BaseView
   * @constructor
   */
  var TwentyThreeView = function TwentyThreeView() {
  };

  return TwentyThreeView.extend('TwentyThreeView', {

    /**
     * Render twentythree element
     * @memberOf TwentyThreeView
     */
    renderTwentyThree: function renderTwentyThree() {

      this.header(Header, this.get$container());

      /**
       * Define $twentythree
       * @type {TwentyThreeElement}
       */
      this.elements.$twentythree = new TwentyThreeElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf TwentyThreeView
     * @returns {TwentyThreePreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define TwentyThree Preferences Element
       * @type {TwentyThreePreferencesElement}
       */
      this.elements.$preferences = new TwentyThreePreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf TwentyThreeView
     * @param widgetRules
     * @param contentRules
     * @returns {TwentyThreeRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define TwentyThree Rules Element
       * @type {TwentyThreeRulesElement}
       */
      this.elements.$rules = new TwentyThreeRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render twentythree
     * @memberOf TwentyThreeView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderTwentyThree.bind(this)
      );
    }

  }, BaseView.prototype)

});
