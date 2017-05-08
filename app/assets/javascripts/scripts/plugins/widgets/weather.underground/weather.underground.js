/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/weather.underground/mvc/weather.underground.controller',
  'plugins/widgets/weather.underground/mvc/weather.underground.model',
  'plugins/widgets/weather.underground/mvc/weather.underground.view',
  'plugins/widgets/weather.underground/mvc/weather.underground.event.manager',
  'plugins/widgets/weather.underground/mvc/weather.underground.permission'
], function defineWeatherUnderground(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define WeatherUnderground
   * @param containment
   * @param [opts]
   * @constructor
   * @class WeatherUnderground
   * @extends AntHill
   */
  var WeatherUnderground = function WeatherUnderground(containment, opts) {

    /**
     * Define containment
     * @property WeatherUnderground
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property WeatherUnderground
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
     * @property WeatherUnderground
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

  return WeatherUnderground.extend('WeatherUnderground', {}, AntHill.prototype);
});
