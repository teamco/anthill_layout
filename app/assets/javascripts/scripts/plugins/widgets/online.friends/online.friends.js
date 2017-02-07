/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/online.friends/mvc/online.friends.controller',
  'plugins/widgets/online.friends/mvc/online.friends.model',
  'plugins/widgets/online.friends/mvc/online.friends.view',
  'plugins/widgets/online.friends/mvc/online.friends.event.manager',
  'plugins/widgets/online.friends/mvc/online.friends.permission'
], function defineOnlineFriends(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define OnlineFriends
   * @param containment
   * @param [opts]
   * @constructor
   * @class OnlineFriends
   * @extends AntHill
   */
  var OnlineFriends = function OnlineFriends(containment, opts) {

    /**
     * Define containment
     * @memberOf OnlineFriends
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf OnlineFriends
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
     * @memberOf OnlineFriends
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

  return OnlineFriends.extend('OnlineFriends', {}, AntHill.prototype);
});