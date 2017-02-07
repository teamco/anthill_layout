/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/metamorphic/mvc/metamorphic.controller',
  'plugins/widgets/metamorphic/mvc/metamorphic.model',
  'plugins/widgets/metamorphic/mvc/metamorphic.view',
  'plugins/widgets/metamorphic/mvc/metamorphic.event.manager',
  'plugins/widgets/metamorphic/mvc/metamorphic.permission'
], function defineMetamorphic(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Metamorphic
   * @param containment
   * @param [opts]
   * @constructor
   * @class Metamorphic
   * @extends AntHill
   */
  var Metamorphic = function Metamorphic(containment, opts) {

    /**
     * Define containment
     * @property Metamorphic
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Metamorphic
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
     * @property Metamorphic
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

    // Update metamorphic containment
    this.containment.model.setConfig('metamorphic', true);
  };

  return Metamorphic.extend('Metamorphic', {}, AntHill.prototype);
});
