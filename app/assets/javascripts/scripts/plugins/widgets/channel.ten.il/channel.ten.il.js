/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/channel.ten.il/mvc/channel.ten.il.controller',
  'plugins/widgets/channel.ten.il/mvc/channel.ten.il.model',
  'plugins/widgets/channel.ten.il/mvc/channel.ten.il.view',
  'plugins/widgets/channel.ten.il/mvc/channel.ten.il.event.manager',
  'plugins/widgets/channel.ten.il/mvc/channel.ten.il.permission'
], function defineChannelTenIl(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define ChannelTenIl
   * @param containment
   * @param [opts]
   * @constructor
   * @class ChannelTenIl
   * @extends AntHill
   */
  var ChannelTenIl = function ChannelTenIl(containment, opts) {

    /**
     * Define containment
     * @property ChannelTenIl
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ChannelTenIl
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
     * @property ChannelTenIl
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

  return ChannelTenIl.extend('ChannelTenIl', {}, AntHill.prototype);
});
