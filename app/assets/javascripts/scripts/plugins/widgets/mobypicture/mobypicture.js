/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/mobypicture/mvc/mobypicture.controller',
  'plugins/widgets/mobypicture/mvc/mobypicture.model',
  'plugins/widgets/mobypicture/mvc/mobypicture.view',
  'plugins/widgets/mobypicture/mvc/mobypicture.event.manager',
  'plugins/widgets/mobypicture/mvc/mobypicture.permission'
], function defineMobypicture(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define Mobypicture
   * @param containment
   * @param [opts]
   * @constructor
   * @class Mobypicture
   * @extends AntHill
   */
  var Mobypicture = function Mobypicture(containment, opts) {

    /**
     * Define containment
     * @memberOf Mobypicture
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf Mobypicture
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
     * @memberOf Mobypicture
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

  return Mobypicture.extend('Mobypicture', {}, AntHill.prototype);
});
