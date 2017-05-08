/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/ovva.tv/mvc/ovva.tv.controller',
  'plugins/widgets/ovva.tv/mvc/ovva.tv.model',
  'plugins/widgets/ovva.tv/mvc/ovva.tv.view',
  'plugins/widgets/ovva.tv/mvc/ovva.tv.event.manager',
  'plugins/widgets/ovva.tv/mvc/ovva.tv.permission'
], function defineOvvaTv(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define OvvaTv
   * @param containment
   * @param [opts]
   * @constructor
   * @class OvvaTv
   * @extends AntHill
   */
  var OvvaTv = function OvvaTv(containment, opts) {

    /**
     * Define containment
     * @property OvvaTv
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property OvvaTv
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
     * @property OvvaTv
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

  return OvvaTv.extend('OvvaTv', {}, AntHill.prototype);
});
