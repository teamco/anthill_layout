/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

defineP([
  'config/anthill',
  'modules/MVC',
  'plugins/page.data/mvc/page.data.controller',
  'plugins/page.data/mvc/page.data.model',
  'plugins/page.data/mvc/page.data.view',
  'plugins/page.data/mvc/page.data.event.manager',
  'plugins/page.data/mvc/page.data.permission'
], function definePageData(AntHill, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define PageData
   * @constructor
   * @param containment
   * @class PageData
   * @extends AntHill
   */
  var PageData = function PageData(containment) {

    /**
     * Define containment
     * @property PageData
     */
    this.containment = containment;

    /**
     * Define active content
     * @property PageData
     * @type {*}
     */
    this.activeContent = undefined;

    /**
     * Allow to locate element
     * @property PageData
     * @type {boolean}
     */
    this.allowToLocate = true;

    /**
     * Define defaults
     * @type {{
     *      plugin: boolean,
     *      getter: boolean,
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
      getter: true,
      html: {
        style: 'default',
        header: true,
        footer: true,
        floating: true,
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
     * @property PageData
     * @type {MVCJs}
     */
    this.mvc = new MVC({
      scope: this,
      config: [DEFAULTS],
      components: [
        Controller,
        Model,
        View,
        EventManager,
        Permission
      ],
      render: true
    });

    this.observer.batchPublish(
        this.eventManager.eventList.successCreated
    );

    this.observer.publish(
        this.eventManager.eventList.updateTranslations,
        ['plugins/page.data/translations/en-us']
    );

    this.controller.subscribeRefreshContentAfterDestroyItems();
    this.controller.subscribeRefreshContentSwitchPage();
  };

  return PageData.extend('PageData', {}, AntHill.prototype);
});