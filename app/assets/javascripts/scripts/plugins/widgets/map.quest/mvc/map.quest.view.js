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
  'plugins/widgets/map.quest/element/map.quest.element',
  'plugins/widgets/map.quest/element/map.quest.preferences.element',
  'plugins/widgets/map.quest/element/map.quest.rules.element'
], function defineMapQuestView(BaseView, Header, Footer, MapQuestElement,
    MapQuestPreferencesElement, MapQuestRulesElement) {

  /**
   * Define view
   * @class MapQuestView
   * @extends BaseView
   * @constructor
   */
  var MapQuestView = function MapQuestView() {
  };

  return MapQuestView.extend('MapQuestView', {

    /**
     * Render MapQuest element
     * @memberOf MapQuestView
     */
    renderMapQuest: function renderMapQuest() {

      this.header(Header, this.get$container());

      /**
       * Define $mapquest
       * @type {MapQuestElement}
       */
      this.elements.$mapquest = new MapQuestElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf MapQuestView
     * @returns {MapQuestPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define MapQuest Preferences Element
       * @type {MapQuestPreferencesElement}
       */
      this.elements.$preferences = new MapQuestPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf MapQuestView
     * @param widgetRules
     * @param contentRules
     * @returns {MapQuestRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define MapQuest Rules Element
       * @type {MapQuestRulesElement}
       */
      this.elements.$rules = new MapQuestRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render MapQuest
     * @memberOf MapQuestView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderMapQuest.bind(this)
      );
    }

  }, BaseView.prototype);
});
