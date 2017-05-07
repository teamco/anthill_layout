/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/one.hd.ru/mvc/one.hd.ru.controller',
  'plugins/widgets/one.hd.ru/mvc/one.hd.ru.model',
  'plugins/widgets/one.hd.ru/mvc/one.hd.ru.view',
  'plugins/widgets/one.hd.ru/mvc/one.hd.ru.event.manager',
  'plugins/widgets/one.hd.ru/mvc/one.hd.ru.permission'
], function defineOneHdRu(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define OneHdRu
   * @param containment
   * @param [opts]
   * @constructor
   * @class OneHdRu
   * @extends AntHill
   */
  var OneHdRu = function OneHdRu(containment, opts) {

    /**
     * Define containment
     * @memberOf OneHdRu
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf OneHdRu
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
     * @memberOf OneHdRu
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

  return OneHdRu.extend('OneHdRu', {}, AntHill.prototype);
});
