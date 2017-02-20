/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/yap.files/mvc/yap.files.controller',
  'plugins/widgets/yap.files/mvc/yap.files.model',
  'plugins/widgets/yap.files/mvc/yap.files.view',
  'plugins/widgets/yap.files/mvc/yap.files.event.manager',
  'plugins/widgets/yap.files/mvc/yap.files.permission'
], function defineYapFiles(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define YapFiles
   * @param containment
   * @param [opts]
   * @constructor
   * @class YapFiles
   * @extends AntHill
   */
  var YapFiles = function YapFiles(containment, opts) {

    /**
     * Define containment
     * @memberOf YapFiles
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf YapFiles
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
     * @memberOf YapFiles
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

  return YapFiles.extend('YapFiles', {}, AntHill.prototype);
});
