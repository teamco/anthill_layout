/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/huffduffer/mvc/huffduffer.controller',
  'plugins/widgets/huffduffer/mvc/huffduffer.model',
  'plugins/widgets/huffduffer/mvc/huffduffer.view',
  'plugins/widgets/huffduffer/mvc/huffduffer.event.manager',
  'plugins/widgets/huffduffer/mvc/huffduffer.permission'
], function defineHuffduffer(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Huffduffer
   * @param containment
   * @param [opts]
   * @constructor
   * @class Huffduffer
   * @extends AntHill
   */
  var Huffduffer = function Huffduffer(containment, opts) {

    /**
     * Define containment
     * @property Huffduffer
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Huffduffer
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
     * @property Huffduffer
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

  return Huffduffer.extend('Huffduffer', {}, AntHill.prototype);
});
