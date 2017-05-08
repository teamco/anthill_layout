/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/ifixit/mvc/ifixit.controller',
  'plugins/widgets/ifixit/mvc/ifixit.model',
  'plugins/widgets/ifixit/mvc/ifixit.view',
  'plugins/widgets/ifixit/mvc/ifixit.event.manager',
  'plugins/widgets/ifixit/mvc/ifixit.permission'
], function defineIfixit(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Ifixit
   * @param containment
   * @param [opts]
   * @constructor
   * @class Ifixit
   * @extends AntHill
   */
  var Ifixit = function Ifixit(containment, opts) {

    /**
     * Define containment
     * @property Ifixit
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Ifixit
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
     * @property Ifixit
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

  return Ifixit.extend('Ifixit', {}, AntHill.prototype);
});
