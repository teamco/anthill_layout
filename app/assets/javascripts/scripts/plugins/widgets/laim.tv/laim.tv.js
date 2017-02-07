/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/laim.tv/mvc/laim.tv.controller',
  'plugins/widgets/laim.tv/mvc/laim.tv.model',
  'plugins/widgets/laim.tv/mvc/laim.tv.view',
  'plugins/widgets/laim.tv/mvc/laim.tv.event.manager',
  'plugins/widgets/laim.tv/mvc/laim.tv.permission'
], function defineLaimTv(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define LaimTv
   * @param containment
   * @param [opts]
   * @constructor
   * @class LaimTv
   * @extends AntHill
   */
  var LaimTv = function LaimTv(containment, opts) {

    /**
     * Define containment
     * @property LaimTv
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property LaimTv
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
     * @property LaimTv
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

  return LaimTv.extend('LaimTv', {}, AntHill.prototype);
});
