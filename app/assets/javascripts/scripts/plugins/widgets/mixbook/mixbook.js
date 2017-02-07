/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/mixbook/mvc/mixbook.controller',
  'plugins/widgets/mixbook/mvc/mixbook.model',
  'plugins/widgets/mixbook/mvc/mixbook.view',
  'plugins/widgets/mixbook/mvc/mixbook.event.manager',
  'plugins/widgets/mixbook/mvc/mixbook.permission'
], function defineMixbook(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Mixbook
   * @param containment
   * @param [opts]
   * @constructor
   * @class Mixbook
   * @extends AntHill
   */
  var Mixbook = function Mixbook(containment, opts) {

    /**
     * Define containment
     * @memberOf Mixbook
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Mixbook
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
     * @memberOf Mixbook
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

  return Mixbook.extend('Mixbook', {}, AntHill.prototype);
});
