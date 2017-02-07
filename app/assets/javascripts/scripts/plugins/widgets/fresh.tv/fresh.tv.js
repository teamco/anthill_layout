/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/fresh.tv/mvc/fresh.tv.controller',
  'plugins/widgets/fresh.tv/mvc/fresh.tv.model',
  'plugins/widgets/fresh.tv/mvc/fresh.tv.view',
  'plugins/widgets/fresh.tv/mvc/fresh.tv.event.manager',
  'plugins/widgets/fresh.tv/mvc/fresh.tv.permission'
], function defineFreshTv(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define FreshTv
   * @param containment
   * @param [opts]
   * @constructor
   * @class FreshTv
   * @extends AntHill
   */
  var FreshTv = function FreshTv(containment, opts) {

    /**
     * Define containment
     * @property FreshTv
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property FreshTv
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
     * @property FreshTv
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

  return FreshTv.extend('FreshTv', {}, AntHill.prototype);
});
