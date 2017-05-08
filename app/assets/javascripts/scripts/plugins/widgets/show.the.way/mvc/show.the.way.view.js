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
  'plugins/widgets/show.the.way/element/show.the.way.element',
  'plugins/widgets/show.the.way/element/show.the.way.preferences.element',
  'plugins/widgets/show.the.way/element/show.the.way.rules.element'
], function defineShowTheWayView(BaseView, Header, Footer, ShowTheWayElement,
    ShowTheWayPreferencesElement, ShowTheWayRulesElement) {

  /**
   * Define view
   * @class ShowTheWayView
   * @extends BaseView
   * @constructor
   */
  var ShowTheWayView = function ShowTheWayView() {
  };

  return ShowTheWayView.extend('ShowTheWayView', {

    /**
     * Render ShowTheWay element
     * @memberOf ShowTheWayView
     */
    renderShowTheWay: function renderShowTheWay() {

      this.header(Header, this.get$container());

      /**
       * Define $showtheway
       * @type {ShowTheWayElement}
       */
      this.elements.$showtheway = new ShowTheWayElement(this, {
        $container: this.get$container().$
      });

      this.footer(Footer, this.get$container());

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.analyzeEmbeddedContent
      );
    },

    /**
     * Render Prefs
     * @memberOf ShowTheWayView
     * @returns {ShowTheWayPreferencesElement}
     */
    renderPreferences: function renderPreferences() {

      /**
       * Define ShowTheWay Preferences Element
       * @type {ShowTheWayPreferencesElement}
       */
      this.elements.$preferences = new ShowTheWayPreferencesElement(this, {
        data: this.controller.getPreferences()
      });

      return this.get$preferences();
    },

    /**
     * Render Rules
     * @memberOf ShowTheWayView
     * @param widgetRules
     * @param contentRules
     * @returns {ShowTheWayRulesElement}
     */
    renderRules: function renderRules(widgetRules, contentRules) {

      /**
       * Define ShowTheWay Rules Element
       * @type {ShowTheWayRulesElement}
       */
      this.elements.$rules = new ShowTheWayRulesElement(this, {
        data: this.controller.getRules(),
        rules: {
          widget: widgetRules,
          content: contentRules
        }
      });

      return this.get$rules();
    },

    /**
     * Render ShowTheWay
     * @memberOf ShowTheWayView
     */
    render: function render() {

      this.scope.observer.publish(
          this.scope.eventmanager.eventList.successRendered,
          this.renderShowTheWay.bind(this)
      );
    }

  }, BaseView.prototype);
});
