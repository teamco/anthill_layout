/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
  'plugins/plugin.controller',
  'plugins/widgets/widget.content.controller'
], function defineEventsCalendarController(PluginBase,
    WidgetContentController) {

  /**
   * Define EventsCalendar controller
   * @class EventsCalendarController
   * @extends PluginController
   * @extends WidgetContentController
   * @constructor
   */
  var EventsCalendarController = function EventsCalendarController() {
  };

  return EventsCalendarController.extend('EventsCalendarController', {

    /**
     * Set embedded content
     * @memberOf EventsCalendarController
     */
    setEmbeddedContent: function setEmbeddedContent() {

      this.view.elements.$eventscalendar.renderEmbeddedContent();
    },

    /**
     * Add EventsCalendar rule
     * @memberOf EventsCalendarController
     * @param {Event} e
     */
    addEventsCalendarRule: function addEventsCalendarRule(e) {
      this.addWidgetRule(e, this.scope.name);
    }

  }, PluginBase.prototype, WidgetContentController.prototype);
});
