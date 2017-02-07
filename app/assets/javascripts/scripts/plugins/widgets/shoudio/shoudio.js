/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/shoudio/mvc/shoudio.controller',
  'plugins/widgets/shoudio/mvc/shoudio.model',
  'plugins/widgets/shoudio/mvc/shoudio.view',
  'plugins/widgets/shoudio/mvc/shoudio.event.manager',
  'plugins/widgets/shoudio/mvc/shoudio.permission'
], function defineShoudio(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Shoudio
   * @param containment
   * @param [opts]
   * @constructor
   * @class Shoudio
   * @extends AntHill
   */
  var Shoudio = function Shoudio(containment, opts) {

    /**
     * Define containment
     * @property Shoudio
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Shoudio
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
     * @property Shoudio
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

  return Shoudio.extend('Shoudio', {}, AntHill.prototype);
});
