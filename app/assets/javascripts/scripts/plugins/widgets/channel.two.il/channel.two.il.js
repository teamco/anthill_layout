/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/channel.two.il/mvc/channel.two.il.controller',
  'plugins/widgets/channel.two.il/mvc/channel.two.il.model',
  'plugins/widgets/channel.two.il/mvc/channel.two.il.view',
  'plugins/widgets/channel.two.il/mvc/channel.two.il.event.manager',
  'plugins/widgets/channel.two.il/mvc/channel.two.il.permission'
], function defineChannelTwoIl(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define ChannelTwoIl
   * @param containment
   * @param [opts]
   * @constructor
   * @class ChannelTwoIl
   * @extends AntHill
   */
  var ChannelTwoIl = function ChannelTwoIl(containment, opts) {

    /**
     * Define containment
     * @property ChannelTwoIl
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ChannelTwoIl
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
     * @property ChannelTwoIl
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

  return ChannelTwoIl.extend('ChannelTwoIl', {}, AntHill.prototype);
});
