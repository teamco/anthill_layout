/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/the.weather.network/mvc/the.weather.network.controller',
  'plugins/widgets/the.weather.network/mvc/the.weather.network.model',
  'plugins/widgets/the.weather.network/mvc/the.weather.network.view',
  'plugins/widgets/the.weather.network/mvc/the.weather.network.event.manager',
  'plugins/widgets/the.weather.network/mvc/the.weather.network.permission'
], function defineTheWeatherNetwork(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define TheWeatherNetwork
   * @param containment
   * @param [opts]
   * @constructor
   * @class TheWeatherNetwork
   * @extends AntHill
   */
  var TheWeatherNetwork = function TheWeatherNetwork(containment, opts) {

    /**
     * Define containment
     * @property TheWeatherNetwork
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property TheWeatherNetwork
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
     * @property TheWeatherNetwork
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

  return TheWeatherNetwork.extend('TheWeatherNetwork', {}, AntHill.prototype);
});
