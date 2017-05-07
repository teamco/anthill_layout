/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/picasa/mvc/picasa.controller',
  'plugins/widgets/picasa/mvc/picasa.model',
  'plugins/widgets/picasa/mvc/picasa.view',
  'plugins/widgets/picasa/mvc/picasa.event.manager',
  'plugins/widgets/picasa/mvc/picasa.permission'
], function definePicasa(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Picasa
   * @param containment
   * @param [opts]
   * @constructor
   * @class Picasa
   * @extends AntHill
   */
  var Picasa = function Picasa(containment, opts) {

    /**
     * Define containment
     * @memberOf Picasa
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Picasa
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
         *      },
         *      regex: RegExp,
         *      mask: string
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
     * @memberOf Picasa
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

  return Picasa.extend('Picasa', {}, AntHill.prototype);
});
