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
  'plugins/widgets/circuit.lab/element/circuit.lab.element',
  'plugins/widgets/circuit.lab/element/circuit.lab.preferences.element',
  'plugins/widgets/circuit.lab/element/circuit.lab.rules.element'
], function defineCircuitLabView(BaseView, Header, Footer, CircuitLabElement,
    CircuitLabPreferencesElement, CircuitLabRulesElement) {

  /**
   * Define view
   * @class CircuitLabView
   * @extends BaseView
   * @constructor
   */
  var CircuitLabView = function CircuitLabView() {
  };

  return CircuitLabView.extend('CircuitLabView', {

    /**
     * Render CircuitLab element
     * @memberOf CircuitLabView
     */
    renderCircuitLab: function renderCircuitLab() {

      this.header(Header, this.get$container());

      /**
       * Define $circuitlab
       * @type {CircuitLabElement}
       */
      this.elements.$circuitlab = new CircuitLabElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf CircuitLabView
     * @returns {CircuitLabPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define CircuitLab Preferences Element
       * @type {CircuitLabPreferencesElement}
       */
      this.elements.$preferences = new CircuitLabPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf CircuitLabView
     * @param widgetRules
     * @param contentRules
     * @returns {CircuitLabRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define CircuitLab Rules Element
       * @type {CircuitLabRulesElement}
       */
      this.elements.$rules = new CircuitLabRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render CircuitLab
     * @memberOf CircuitLabView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderCircuitLab.bind(this)
      );
    }

  }, BaseView.prototype);
});
