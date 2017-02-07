/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/kaltura/mvc/kaltura.controller',
  'plugins/widgets/kaltura/mvc/kaltura.model',
  'plugins/widgets/kaltura/mvc/kaltura.view',
  'plugins/widgets/kaltura/mvc/kaltura.event.manager',
  'plugins/widgets/kaltura/mvc/kaltura.permission'
], function defineKaltura(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Kaltura
   * @param containment
   * @param [opts]
   * @constructor
   * @class Kaltura
   * @extends AntHill
   */
  var Kaltura = function Kaltura(containment, opts) {

    /**
     * Define containment
     * @property Kaltura
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Kaltura
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
     * @property Kaltura
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

  return Kaltura.extend('Kaltura', {}, AntHill.prototype);
});
