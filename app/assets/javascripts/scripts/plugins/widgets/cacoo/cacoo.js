/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/cacoo/mvc/cacoo.controller',
  'plugins/widgets/cacoo/mvc/cacoo.model',
  'plugins/widgets/cacoo/mvc/cacoo.view',
  'plugins/widgets/cacoo/mvc/cacoo.event.manager',
  'plugins/widgets/cacoo/mvc/cacoo.permission'
], function defineCacoo(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Cacoo
   * @param containment
   * @param [opts]
   * @constructor
   * @class Cacoo
   * @extends AntHill
   */
  var Cacoo = function Cacoo(containment, opts) {

    /**
     * Define containment
     * @property Cacoo
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Cacoo
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
     * @property Cacoo
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

  return Cacoo.extend('Cacoo', {}, AntHill.prototype);
});
