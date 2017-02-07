/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/events.calendar/mvc/events.calendar.controller',
  'plugins/widgets/events.calendar/mvc/events.calendar.model',
  'plugins/widgets/events.calendar/mvc/events.calendar.view',
  'plugins/widgets/events.calendar/mvc/events.calendar.event.manager',
  'plugins/widgets/events.calendar/mvc/events.calendar.permission'
], function defineEventsCalendar(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define EventsCalendar
   * @param containment
   * @param [opts]
   * @constructor
   * @class EventsCalendar
   * @extends AntHill
   */
  var EventsCalendar = function EventsCalendar(containment, opts) {

    /**
     * Define containment
     * @property EventsCalendar
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property EventsCalendar
     * @type {*}
     */
    this.referrer = undefined;

    /**
     * Define defaults
     * @type {{
     *      plugin: boolean,
     *      html: {
     *          style: string,
     *          header: boolean,
     *          footer: boolean,
     *          floating: boolean,
     *          padding: {
     *              top: number,
     *              right: number,
     *              bottom: number,
     *              left: number
     *          }
     *      }
     * }}
     */
    var DEFAULTS = {
      plugin: true,
      html: {
        style: 'default',
        header: false,
        footer: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define MVC
     * @property EventsCalendar
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [
        {uuid: this.containment.model.getContentUUID()},
        DEFAULTS
      ],
      components: [
        Controller,
        Model,
        View,
        EventManager,
        Permission
      ],
      render: true
    });

    this.observer.publish(
        this.eventmanager.eventList.initWidget,
        opts
    );
  };

  return EventsCalendar.extend('EventsCalendar', {}, AntHill.prototype);
});
