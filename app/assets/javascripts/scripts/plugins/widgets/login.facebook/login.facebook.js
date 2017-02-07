/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/login.facebook/mvc/login.facebook.controller',
  'plugins/widgets/login.facebook/mvc/login.facebook.model',
  'plugins/widgets/login.facebook/mvc/login.facebook.view',
  'plugins/widgets/login.facebook/mvc/login.facebook.event.manager',
  'plugins/widgets/login.facebook/mvc/login.facebook.permission'
], function defineLoginFacebook(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define LoginFacebook
   * @param containment
   * @param [opts]
   * @constructor
   * @class LoginFacebook
   * @extends AntHill
   */
  var LoginFacebook = function LoginFacebook(containment, opts) {

    /**
     * Define containment
     * @memberOf LoginFacebook
     */
    this.containment = containment;

    /**
     * Define referrer
     * @memberOf LoginFacebook
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
     * @memberOf LoginFacebook
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

  return LoginFacebook.extend('LoginFacebook', {}, AntHill.prototype);
});