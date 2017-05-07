/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/count.down/mvc/count.down.controller',
  'plugins/widgets/count.down/mvc/count.down.model',
  'plugins/widgets/count.down/mvc/count.down.view',
  'plugins/widgets/count.down/mvc/count.down.event.manager',
  'plugins/widgets/count.down/mvc/count.down.permission'
], function defineCountDown(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define CountDown
   * @param containment
   * @param [opts]
   * @constructor
   * @class CountDown
   * @extends AntHill
   */
  var CountDown = function CountDown(containment, opts) {

    /**
     * Define containment
     * @property CountDown
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property CountDown
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
     * @property CountDown
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

  return CountDown.extend('CountDown', {}, AntHill.prototype);
});
