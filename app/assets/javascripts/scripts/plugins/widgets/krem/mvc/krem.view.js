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
  'plugins/widgets/krem/element/krem.element',
  'plugins/widgets/krem/element/krem.preferences.element',
  'plugins/widgets/krem/element/krem.rules.element'
], function defineKremView(BaseView, Header, Footer, KremElement,
    KremPreferencesElement, KremRulesElement) {

  /**
   * Define view
   * @class KremView
   * @extends BaseView
   * @constructor
   */
  var KremView = function KremView() {
  };

  return KremView.extend('KremView', {

    /**
     * Render krem element
     * @memberOf KremView
     */
    renderKrem: function renderKrem() {

      this.header(Header, this.get$container());

      /**
       * Define $krem
       * @type {KremElement}
       */
      this.elements.$krem = new KremElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf KremView
     * @returns {KremPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Krem Preferences Element
       * @type {KremPreferencesElement}
       */
      this.elements.$preferences = new KremPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf KremView
     * @param widgetRules
     * @param contentRules
     * @returns {KremRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define data
       * @type {*|{}}
       */
      var data = this.controller.getRules();

      /**
       * Define Krem Rules Element
       * @type {KremRulesElement}
       */
      this.elements.$rules = new KremRulesElement(this, {
        data: data,
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render krem
     * @memberOf KremView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderKrem.bind(this)
      );
    }

  }, BaseView.prototype)

});
