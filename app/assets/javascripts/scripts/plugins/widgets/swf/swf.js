/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/swf/mvc/swf.controller',
  'plugins/widgets/swf/mvc/swf.model',
  'plugins/widgets/swf/mvc/swf.view',
  'plugins/widgets/swf/mvc/swf.event.manager',
  'plugins/widgets/swf/mvc/swf.permission'
], function defineSwf(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Swf
   * @param containment
   * @param [opts]
   * @constructor
   * @class Swf
   * @extends AntHill
   */
  var Swf = function Swf(containment, opts) {

    /**
     * Define containment
     * @memberOf Swf
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Swf
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
     * @memberOf Swf
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

  return Swf.extend('Swf', {}, AntHill.prototype);
});