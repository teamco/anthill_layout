/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/ustream/mvc/ustream.controller',
  'plugins/widgets/ustream/mvc/ustream.model',
  'plugins/widgets/ustream/mvc/ustream.view',
  'plugins/widgets/ustream/mvc/ustream.event.manager',
  'plugins/widgets/ustream/mvc/ustream.permission'
], function defineUstream(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Ustream
   * @param containment
   * @param [opts]
   * @constructor
   * @class Ustream
   * @extends AntHill
   */
  var Ustream = function Ustream(containment, opts) {

    /**
     * Define containment
     * @memberOf Ustream
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Ustream
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
     * @memberOf Ustream
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

  return Ustream.extend('Ustream', {}, AntHill.prototype);
});
