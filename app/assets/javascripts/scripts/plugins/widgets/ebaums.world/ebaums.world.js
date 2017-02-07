/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/ebaums.world/mvc/ebaums.world.controller',
  'plugins/widgets/ebaums.world/mvc/ebaums.world.model',
  'plugins/widgets/ebaums.world/mvc/ebaums.world.view',
  'plugins/widgets/ebaums.world/mvc/ebaums.world.event.manager',
  'plugins/widgets/ebaums.world/mvc/ebaums.world.permission'
], function defineEbaumsWorld(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define EbaumsWorld
   * @param containment
   * @param [opts]
   * @constructor
   * @class EbaumsWorld
   * @extends AntHill
   */
  var EbaumsWorld = function EbaumsWorld(containment, opts) {

    /**
     * Define containment
     * @property EbaumsWorld
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property EbaumsWorld
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
     * @property EbaumsWorld
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

  return EbaumsWorld.extend('EbaumsWorld', {}, AntHill.prototype);
});
