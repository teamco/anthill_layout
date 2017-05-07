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
  'plugins/widgets/prochan/element/prochan.element',
  'plugins/widgets/prochan/element/prochan.preferences.element',
  'plugins/widgets/prochan/element/prochan.rules.element'
], function defineProchanView(BaseView, Header, Footer, ProchanElement,
    ProchanPreferencesElement, ProchanRulesElement) {

  /**
   * Define view
   * @class ProchanView
   * @extends BaseView
   * @constructor
   */
  var ProchanView = function ProchanView() {
  };

  return ProchanView.extend('ProchanView', {

    /**
     * Render Prochan element
     * @memberOf ProchanView
     */
    renderProchan: function renderProchan() {

      this.header(Header, this.get$container());

      /**
       * Define $prochan
       * @type {ProchanElement}
       */
      this.elements.$prochan = new ProchanElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ProchanView
     * @returns {ProchanPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define Prochan Preferences Element
       * @type {ProchanPreferencesElement}
       */
      this.elements.$preferences = new ProchanPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ProchanView
     * @param widgetRules
     * @param contentRules
     * @returns {ProchanRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define Prochan Rules Element
       * @type {ProchanRulesElement}
       */
      this.elements.$rules = new ProchanRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render Prochan
     * @memberOf ProchanView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderProchan.bind(this)
      );
    }

  }, BaseView.prototype);
});
