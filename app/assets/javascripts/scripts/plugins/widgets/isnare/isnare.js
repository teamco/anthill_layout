/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/isnare/mvc/isnare.controller',
  'plugins/widgets/isnare/mvc/isnare.model',
  'plugins/widgets/isnare/mvc/isnare.view',
  'plugins/widgets/isnare/mvc/isnare.event.manager',
  'plugins/widgets/isnare/mvc/isnare.permission'
], function defineIsnare(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Isnare
   * @param containment
   * @param [opts]
   * @constructor
   * @class Isnare
   * @extends AntHill
   */
  var Isnare = function Isnare(containment, opts) {

    /**
     * Define containment
     * @memberOf Isnare
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Isnare
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
     * @memberOf Isnare
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

  return Isnare.extend('Isnare', {}, AntHill.prototype);
});
