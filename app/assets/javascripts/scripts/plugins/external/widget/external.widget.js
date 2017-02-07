/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */
define([
  'config/anthill',
  'modules/MVC'
], function defineExternal(AntHill, MVC) {

  /**
   * Define ExternalWidget
   * @param {Widget} containment
   * @param [opts]
   * @constructor
   * @class ExternalWidget
   * @extends AntHill
   */
  var ExternalWidget = function ExternalWidget(containment, opts) {

    /**
     * Define containment
     * @property ExternalWidget
     * @type {Widget}
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property ExternalWidget
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
     * Fetch external resource
     * @property ExternalWidget
     * @type {string}
     */
    this.externalResource = this.containment.controller.fetchExternalResource();

    require([
      this.externalResource + 'mvc/external.widget.controller.js',
      this.externalResource + 'mvc/external.widget.model.js',
      this.externalResource + 'mvc/external.widget.view.js',
      this.externalResource + 'mvc/external.widget.event.manager.js',
      this.externalResource + 'mvc/external.widget.permission.js'
    ], function _loadDependencies(Controller, Model, View, EventManager,
        Permission) {

      /**
       * Define MVC
       * @property ExternalWidget
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

    }.bind(this));
  };

  return ExternalWidget.extend('ExternalWidget', {}, AntHill.prototype);
});