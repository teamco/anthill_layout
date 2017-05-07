/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/docs.com/mvc/docs.com.controller',
  'plugins/widgets/docs.com/mvc/docs.com.model',
  'plugins/widgets/docs.com/mvc/docs.com.view',
  'plugins/widgets/docs.com/mvc/docs.com.event.manager',
  'plugins/widgets/docs.com/mvc/docs.com.permission'
], function defineDocsCom(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define DocsCom
   * @param containment
   * @param [opts]
   * @constructor
   * @class DocsCom
   * @extends AntHill
   */
  var DocsCom = function DocsCom(containment, opts) {

    /**
     * Define containment
     * @property DocsCom
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property DocsCom
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
     * @property DocsCom
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

  return DocsCom.extend('DocsCom', {}, AntHill.prototype);
});
