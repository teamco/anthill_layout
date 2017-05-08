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
  'plugins/widgets/clyp.it/element/clyp.it.element',
  'plugins/widgets/clyp.it/element/clyp.it.preferences.element',
  'plugins/widgets/clyp.it/element/clyp.it.rules.element'
], function defineClypItView(BaseView, Header, Footer, ClypItElement,
    ClypItPreferencesElement, ClypItRulesElement) {

  /**
   * Define view
   * @class ClypItView
   * @extends BaseView
   * @constructor
   */
  var ClypItView = function ClypItView() {
  };

  return ClypItView.extend('ClypItView', {

    /**
     * Render ClypIt element
     * @memberOf ClypItView
     */
    renderClypIt: function renderClypIt() {

      this.header(Header, this.get$container());

      /**
       * Define $clypit
       * @type {ClypItElement}
       */
      this.elements.$clypit = new ClypItElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ClypItView
     * @returns {ClypItPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define ClypIt Preferences Element
       * @type {ClypItPreferencesElement}
       */
      this.elements.$preferences = new ClypItPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ClypItView
     * @param widgetRules
     * @param contentRules
     * @returns {ClypItRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define ClypIt Rules Element
       * @type {ClypItRulesElement}
       */
      this.elements.$rules = new ClypItRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render ClypIt
     * @memberOf ClypItView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderClypIt.bind(this)
      );
    }

  }, BaseView.prototype);
});
