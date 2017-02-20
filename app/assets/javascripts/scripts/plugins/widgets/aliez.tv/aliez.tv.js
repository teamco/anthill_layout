/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/aliez.tv/mvc/aliez.tv.controller',
  'plugins/widgets/aliez.tv/mvc/aliez.tv.model',
  'plugins/widgets/aliez.tv/mvc/aliez.tv.view',
  'plugins/widgets/aliez.tv/mvc/aliez.tv.event.manager',
  'plugins/widgets/aliez.tv/mvc/aliez.tv.permission'
], function defineAliezTv(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define AliezTv
   * @param containment
   * @param [opts]
   * @constructor
   * @class AliezTv
   * @extends AntHill
   */
  var AliezTv = function AliezTv(containment, opts) {

    /**
     * Define containment
     * @property AliezTv
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property AliezTv
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
     * @property AliezTv
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

  return AliezTv.extend('AliezTv', {}, AntHill.prototype);
});
