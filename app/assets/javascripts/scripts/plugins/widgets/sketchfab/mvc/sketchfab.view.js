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
  'plugins/widgets/sketchfab/element/sketchfab.element',
  'plugins/widgets/sketchfab/element/sketchfab.preferences.element',
  'plugins/widgets/sketchfab/element/sketchfab.rules.element'
], function defineSketchfabView(BaseView, Header, Footer, SketchfabElement,
    SketchfabPreferencesElement, SketchfabRulesElement) {

  /**
   * Define view
   * @class SketchfabView
   * @extends BaseView
   * @constructor
   */
  var SketchfabView = function SketchfabView() {
  };

  return SketchfabView.extend('SketchfabView', {

    /**
     * Render Sketchfab element
     * @memberOf SketchfabView
     */
    renderSketchfab: function renderSketchfab() {

      this.header(Header, this.get$container());

      /**
       * Define $sketchfab
       * @type {SketchfabElement}
       */
      this.elements.$sketchfab = new SketchfabElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf SketchfabView
     * @returns {SketchfabPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Sketchfab Preferences Element
       * @type {SketchfabPreferencesElement}
       */
      this.elements.$preferences = new SketchfabPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf SketchfabView
     * @param widgetRules
     * @param contentRules
     * @returns {SketchfabRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Sketchfab Rules Element
       * @type {SketchfabRulesElement}
       */
      this.elements.$rules = new SketchfabRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Sketchfab
     * @memberOf SketchfabView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderSketchfab.bind(this)
      );
    }

  }, BaseView.prototype);
});
