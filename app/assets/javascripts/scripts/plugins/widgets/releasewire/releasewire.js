/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/releasewire/mvc/releasewire.controller',
  'plugins/widgets/releasewire/mvc/releasewire.model',
  'plugins/widgets/releasewire/mvc/releasewire.view',
  'plugins/widgets/releasewire/mvc/releasewire.event.manager',
  'plugins/widgets/releasewire/mvc/releasewire.permission'
], function defineReleasewire(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Releasewire
   * @param containment
   * @param [opts]
   * @constructor
   * @class Releasewire
   * @extends AntHill
   */
  var Releasewire = function Releasewire(containment, opts) {

    /**
     * Define containment
     * @property Releasewire
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Releasewire
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
     * @property Releasewire
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

  return Releasewire.extend('Releasewire', {}, AntHill.prototype);
});
