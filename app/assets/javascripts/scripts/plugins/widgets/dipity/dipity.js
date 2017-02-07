/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/dipity/mvc/dipity.controller',
  'plugins/widgets/dipity/mvc/dipity.model',
  'plugins/widgets/dipity/mvc/dipity.view',
  'plugins/widgets/dipity/mvc/dipity.event.manager',
  'plugins/widgets/dipity/mvc/dipity.permission'
], function defineDipity(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Dipity
   * @param containment
   * @param [opts]
   * @constructor
   * @class Dipity
   * @extends AntHill
   */
  var Dipity = function Dipity(containment, opts) {

    /**
     * Define containment
     * @property Dipity
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Dipity
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
     * @property Dipity
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

  return Dipity.extend('Dipity', {}, AntHill.prototype);
});
