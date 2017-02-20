/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model',
  'plugins/widgets/widget.content.model'
], function defineEventsCalendarModel(BaseModel, WidgetContentModel) {

  /**
   * Define EventsCalendar model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class EventsCalendarModel
   * @constructor
   */
  var EventsCalendarModel = function EventsCalendarModel() {

    /**
     * Define preferences
     * @property EventsCalendarModel
     * @type {{
     *      eventscalendarSelectable: {type: string, disabled: boolean,
     *     checked: boolean, visible: boolean, value: boolean},
     *     eventscalendarEditable: {type: string, disabled: boolean,
     *     checked: boolean, visible: boolean, value: boolean},
     *     eventscalendarLimit: {type: string, disabled: boolean, checked:
     *     boolean, visible: boolean, value: boolean}
     * }}
     */
    this.preferences = {
      eventscalendarSelectable: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true,
        value: true
      },
      eventscalendarEditable: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true,
        value: true
      },
      eventscalendarLimit: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true,
        value: true
      }
    };

    /**
     * Define rules
     * @property EventsCalendarModel
     * @type {{}}
     */
    this.rules = {};
  };

  return EventsCalendarModel.extend('EventsCalendarModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
