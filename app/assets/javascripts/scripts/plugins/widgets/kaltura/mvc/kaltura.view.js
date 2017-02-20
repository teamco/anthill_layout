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
  'plugins/widgets/kaltura/element/kaltura.element',
  'plugins/widgets/kaltura/element/kaltura.preferences.element',
  'plugins/widgets/kaltura/element/kaltura.rules.element'
], function defineKalturaView(BaseView, Header, Footer, KalturaElement,
    KalturaPreferencesElement, KalturaRulesElement) {

  /**
   * Define view
   * @class KalturaView
   * @extends BaseView
   * @constructor
   */
  var KalturaView = function KalturaView() {
  };

  return KalturaView.extend('KalturaView', {

    /**
     * Render Kaltura element
     * @memberOf KalturaView
     */
    renderKaltura: function renderKaltura() {

      this.header(Header, this.get$container());

      /**
       * Define $kaltura
       * @type {KalturaElement}
       */
      this.elements.$kaltura = new KalturaElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf KalturaView
     * @returns {KalturaPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Kaltura Preferences Element
       * @type {KalturaPreferencesElement}
       */
      this.elements.$preferences = new KalturaPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf KalturaView
     * @param widgetRules
     * @param contentRules
     * @returns {KalturaRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Kaltura Rules Element
       * @type {KalturaRulesElement}
       */
      this.elements.$rules = new KalturaRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Kaltura
     * @memberOf KalturaView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderKaltura.bind(this)
      );
    }

  }, BaseView.prototype);
});
