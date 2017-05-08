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
  'plugins/widgets/learning.apps/element/learning.apps.element',
  'plugins/widgets/learning.apps/element/learning.apps.preferences.element',
  'plugins/widgets/learning.apps/element/learning.apps.rules.element'
], function defineLearningAppsView(BaseView, Header, Footer,
    LearningAppsElement, LearningAppsPreferencesElement,
    LearningAppsRulesElement) {

  /**
   * Define view
   * @class LearningAppsView
   * @extends BaseView
   * @constructor
   */
  var LearningAppsView = function LearningAppsView() {
  };

  return LearningAppsView.extend('LearningAppsView', {

    /**
     * Render LearningApps element
     * @memberOf LearningAppsView
     */
    renderLearningApps: function renderLearningApps() {

      this.header(Header, this.get$container());

      /**
       * Define $learningapps
       * @type {LearningAppsElement}
       */
      this.elements.$learningapps = new LearningAppsElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf LearningAppsView
     * @returns {LearningAppsPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define LearningApps Preferences Element
       * @type {LearningAppsPreferencesElement}
       */
      this.elements.$preferences = new LearningAppsPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf LearningAppsView
     * @param widgetRules
     * @param contentRules
     * @returns {LearningAppsRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define LearningApps Rules Element
       * @type {LearningAppsRulesElement}
       */
      this.elements.$rules = new LearningAppsRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render LearningApps
     * @memberOf LearningAppsView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderLearningApps.bind(this)
      );
    }

  }, BaseView.prototype);
});
