/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/geolocation.map/mvc/geolocation.map.controller',
  'plugins/widgets/geolocation.map/mvc/geolocation.map.model',
  'plugins/widgets/geolocation.map/mvc/geolocation.map.view',
  'plugins/widgets/geolocation.map/mvc/geolocation.map.event.manager',
  'plugins/widgets/geolocation.map/mvc/geolocation.map.permission'
], function defineGeolocationMap(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define GeolocationMap
   * @param containment
   * @param [opts]
   * @constructor
   * @class GeolocationMap
   * @extends AntHill
   */
  let GeolocationMap = function GeolocationMap(containment, opts) {

    /**
     * Define containment
     * @memberOf GeolocationMap
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf GeolocationMap
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
     */
    let DEFAULTS = {
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
     * @memberOf GeolocationMap
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

  return GeolocationMap.extend('GeolocationMap', {}, AntHill.prototype);
});