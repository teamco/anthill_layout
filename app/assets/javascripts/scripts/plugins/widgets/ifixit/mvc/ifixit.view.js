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
  'plugins/widgets/ifixit/element/ifixit.element',
  'plugins/widgets/ifixit/element/ifixit.preferences.element',
  'plugins/widgets/ifixit/element/ifixit.rules.element'
], function defineIfixitView(BaseView, Header, Footer, IfixitElement,
    IfixitPreferencesElement, IfixitRulesElement) {

  /**
   * Define view
   * @class IfixitView
   * @extends BaseView
   * @constructor
   */
  var IfixitView = function IfixitView() {
  };

  return IfixitView.extend('IfixitView', {

    /**
     * Render Ifixit element
     * @memberOf IfixitView
     */
    renderIfixit: function renderIfixit() {

      this.header(Header, this.get$container());

      /**
       * Define $ifixit
       * @type {IfixitElement}
       */
      this.elements.$ifixit = new IfixitElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf IfixitView
     * @returns {IfixitPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Ifixit Preferences Element
       * @type {IfixitPreferencesElement}
       */
      this.elements.$preferences = new IfixitPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf IfixitView
     * @param widgetRules
     * @param contentRules
     * @returns {IfixitRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Ifixit Rules Element
       * @type {IfixitRulesElement}
       */
      this.elements.$rules = new IfixitRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Ifixit
     * @memberOf IfixitView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderIfixit.bind(this)
      );
    }

  }, BaseView.prototype);
});
