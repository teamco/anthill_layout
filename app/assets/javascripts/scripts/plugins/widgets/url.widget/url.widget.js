/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/url.widget/mvc/url.widget.controller',
  'plugins/widgets/url.widget/mvc/url.widget.model',
  'plugins/widgets/url.widget/mvc/url.widget.view',
  'plugins/widgets/url.widget/mvc/url.widget.event.manager',
  'plugins/widgets/url.widget/mvc/url.widget.permission'
], function defineUrlWidget(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define UrlWidget
   * @param containment
   * @param [opts]
   * @constructor
   * @class UrlWidget
   * @extends AntHill
   */
  var UrlWidget = function UrlWidget(containment, opts) {

    /**
     * Define containment
     * @property UrlWidget
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property UrlWidget
     * @type {*}
     */
    this.referrer = undefined;

    /**
     * Define cachedd content
     * @property UrlWidget
     * @type {string}
     */
    this.cachedContent = undefined;

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
     * @property UrlWidget
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

  return UrlWidget.extend('UrlWidget', {}, AntHill.prototype);
});
