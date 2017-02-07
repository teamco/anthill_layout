/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
  'config/anthill',
  'modules/MVC',
  'plugins/widgets/flickr.feeds/mvc/flickr.feeds.controller',
  'plugins/widgets/flickr.feeds/mvc/flickr.feeds.model',
  'plugins/widgets/flickr.feeds/mvc/flickr.feeds.view',
  'plugins/widgets/flickr.feeds/mvc/flickr.feeds.event.manager',
  'plugins/widgets/flickr.feeds/mvc/flickr.feeds.permission'
], function defineFlickrFeeds(AntHill, MVC, Controller, Model, View,
    EventManager, Permission) {

  /**
   * Define FlickrFeeds
   * @param containment
   * @param [opts]
   * @constructor
   * @class FlickrFeeds
   * @extends AntHill
   */
  var FlickrFeeds = function FlickrFeeds(containment, opts) {

    /**
     * Define containment
     * @property FlickrFeeds
     */
    this.containment = containment;

    /**
     * Define referrer
     * @property FlickrFeeds
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
     * @property FlickrFeeds
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

  return FlickrFeeds.extend('FlickrFeeds', {}, AntHill.prototype);
});
