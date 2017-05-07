/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/animoto/mvc/animoto.controller',
  'plugins/widgets/animoto/mvc/animoto.model',
  'plugins/widgets/animoto/mvc/animoto.view',
  'plugins/widgets/animoto/mvc/animoto.event.manager',
  'plugins/widgets/animoto/mvc/animoto.permission'
], function defineAnimoto(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Animoto
   * @param containment
   * @param [opts]
   * @constructor
   * @class Animoto
   * @extends AntHill
   */
  var Animoto = function Animoto(containment, opts) {

    /**
     * Define containment
     * @property Animoto
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Animoto
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
     * @property Animoto
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

  return Animoto.extend('Animoto', {}, AntHill.prototype);
});
