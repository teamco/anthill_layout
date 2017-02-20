/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/spankwire/mvc/spankwire.controller',
  'plugins/widgets/spankwire/mvc/spankwire.model',
  'plugins/widgets/spankwire/mvc/spankwire.view',
  'plugins/widgets/spankwire/mvc/spankwire.event.manager',
  'plugins/widgets/spankwire/mvc/spankwire.permission'
], function defineSpankwire(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Spankwire
   * @param containment
   * @param [opts]
   * @constructor
   * @class Spankwire
   * @extends AntHill
   */
  var Spankwire = function Spankwire(containment, opts) {

    /**
     * Define containment
     * @memberOf Spankwire
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Spankwire
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
     * @memberOf Spankwire
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

  return Spankwire.extend('Spankwire', {}, AntHill.prototype);
});
