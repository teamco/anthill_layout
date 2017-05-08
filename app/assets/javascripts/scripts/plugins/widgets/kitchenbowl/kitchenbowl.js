/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/kitchenbowl/mvc/kitchenbowl.controller',
  'plugins/widgets/kitchenbowl/mvc/kitchenbowl.model',
  'plugins/widgets/kitchenbowl/mvc/kitchenbowl.view',
  'plugins/widgets/kitchenbowl/mvc/kitchenbowl.event.manager',
  'plugins/widgets/kitchenbowl/mvc/kitchenbowl.permission'
], function defineKitchenbowl(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Kitchenbowl
   * @param containment
   * @param [opts]
   * @constructor
   * @class Kitchenbowl
   * @extends AntHill
   */
  var Kitchenbowl = function Kitchenbowl(containment, opts) {

    /**
     * Define containment
     * @property Kitchenbowl
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property Kitchenbowl
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
     * @property Kitchenbowl
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

  return Kitchenbowl.extend('Kitchenbowl', {}, AntHill.prototype);
});
