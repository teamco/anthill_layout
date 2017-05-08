/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/sap.openui/mvc/sap.openui.controller',
  'plugins/widgets/sap.openui/mvc/sap.openui.model',
  'plugins/widgets/sap.openui/mvc/sap.openui.view',
  'plugins/widgets/sap.openui/mvc/sap.openui.event.manager',
  'plugins/widgets/sap.openui/mvc/sap.openui.permission'
], function defineSapOpenui(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define SapOpenui
   * @param containment
   * @param [opts]
   * @constructor
   * @class SapOpenui
   * @extends AntHill
   */
  var SapOpenui = function SapOpenui(containment, opts) {

    /**
     * Define containment
     * @property SapOpenui
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property SapOpenui
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
     * @property SapOpenui
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

  return SapOpenui.extend('SapOpenui', {}, AntHill.prototype);
});
