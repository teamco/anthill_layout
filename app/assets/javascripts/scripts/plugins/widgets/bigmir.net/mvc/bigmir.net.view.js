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
  'plugins/widgets/bigmir.net/element/bigmir.net.element',
  'plugins/widgets/bigmir.net/element/bigmir.net.preferences.element',
  'plugins/widgets/bigmir.net/element/bigmir.net.rules.element'
], function defineBigmirNetView(BaseView, Header, Footer, BigmirNetElement,
    BigmirNetPreferencesElement, BigmirNetRulesElement) {

  /**
   * Define view
   * @class BigmirNetView
   * @extends BaseView
   * @constructor
   */
  var BigmirNetView = function BigmirNetView() {
  };

  return BigmirNetView.extend('BigmirNetView', {

    /**
     * Render bigmirnet element
     * @memberOf BigmirNetView
     */
    renderBigmirNet: function renderBigmirNet() {

      this.header(Header, this.get$container());

      /**
       * Define $bigmirnet
       * @type {BigmirNetElement}
       */
      this.elements.$bigmirnet = new BigmirNetElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf BigmirNetView
     * @returns {BigmirNetPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define BigmirNet Preferences Element
       * @type {BigmirNetPreferencesElement}
       */
      this.elements.$preferences = new BigmirNetPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf BigmirNetView
     * @param widgetRules
     * @param contentRules
     * @returns {BigmirNetRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define BigmirNet Rules Element
       * @type {BigmirNetRulesElement}
       */
      this.elements.$rules = new BigmirNetRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render bigmirnet
     * @memberOf BigmirNetView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderBigmirNet.bind(this)
      );
    }

  }, BaseView.prototype)

});
