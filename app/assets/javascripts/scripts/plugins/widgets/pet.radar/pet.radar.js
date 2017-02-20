/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/pet.radar/mvc/pet.radar.controller',
  'plugins/widgets/pet.radar/mvc/pet.radar.model',
  'plugins/widgets/pet.radar/mvc/pet.radar.view',
  'plugins/widgets/pet.radar/mvc/pet.radar.event.manager',
  'plugins/widgets/pet.radar/mvc/pet.radar.permission'
], function definePetRadar(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define PetRadar
   * @param containment
   * @param [opts]
   * @constructor
   * @class PetRadar
   * @extends AntHill
   */
  var PetRadar = function PetRadar(containment, opts) {

    /**
     * Define containment
     * @memberOf PetRadar
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf PetRadar
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
     * @memberOf PetRadar
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

  return PetRadar.extend('PetRadar', {}, AntHill.prototype);
});