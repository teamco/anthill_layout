/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/coub/mvc/coub.controller',
  'plugins/widgets/coub/mvc/coub.model',
  'plugins/widgets/coub/mvc/coub.view',
  'plugins/widgets/coub/mvc/coub.event.manager',
  'plugins/widgets/coub/mvc/coub.permission'
], function defineCoub(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Coub
   * @param containment
   * @param [opts]
   * @constructor
   * @class Coub
   * @extends AntHill
   */
  var Coub = function Coub(containment, opts) {

    /**
     * Define containment
     * @property Coub
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Coub
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
     * @property Coub
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

  return Coub.extend('Coub', {}, AntHill.prototype);
});
