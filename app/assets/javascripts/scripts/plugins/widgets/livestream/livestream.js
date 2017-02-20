/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/livestream/mvc/livestream.controller',
  'plugins/widgets/livestream/mvc/livestream.model',
  'plugins/widgets/livestream/mvc/livestream.view',
  'plugins/widgets/livestream/mvc/livestream.event.manager',
  'plugins/widgets/livestream/mvc/livestream.permission'
], function defineLivestream(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Livestream
   * @param containment
   * @param [opts]
   * @constructor
   * @class Livestream
   * @extends AntHill
   */
  var Livestream = function Livestream(containment, opts) {

    /**
     * Define containment
     * @memberOf Livestream
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Livestream
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
     * @memberOf Livestream
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

  return Livestream.extend('Livestream', {}, AntHill.prototype);
});
