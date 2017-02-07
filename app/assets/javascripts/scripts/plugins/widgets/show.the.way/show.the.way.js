/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/show.the.way/mvc/show.the.way.controller',
  'plugins/widgets/show.the.way/mvc/show.the.way.model',
  'plugins/widgets/show.the.way/mvc/show.the.way.view',
  'plugins/widgets/show.the.way/mvc/show.the.way.event.manager',
  'plugins/widgets/show.the.way/mvc/show.the.way.permission'
], function defineShowTheWay(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define ShowTheWay
   * @param containment
   * @param [opts]
   * @constructor
   * @class ShowTheWay
   * @extends AntHill
   */
  var ShowTheWay = function ShowTheWay(containment, opts) {

    /**
     * Define containment
     * @property ShowTheWay
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ShowTheWay
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
     * @property ShowTheWay
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

  return ShowTheWay.extend('ShowTheWay', {}, AntHill.prototype);
});
