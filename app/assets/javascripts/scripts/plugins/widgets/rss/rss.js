/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/rss/mvc/rss.controller',
    'plugins/widgets/rss/mvc/rss.model',
    'plugins/widgets/rss/mvc/rss.view',
    'plugins/widgets/rss/mvc/rss.event.manager',
    'plugins/widgets/rss/mvc/rss.permission'
], function defineRss(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Rss
     * @param containment
     * @param [opts]
     * @constructor
     * @class Rss
     * @extends AntHill
     */
    var Rss = function Rss(containment, opts) {

        /**
         * Define containment
         * @memberOf Rss
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Rss
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
         *      googleAPIUrl: string
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
            },

            // https://developers.google.com/feed
            googleAPIUrl: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q='
        };

        /**
         * Define MVC
         * @memberOf Rss
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

    return Rss.extend('Rss', {

    }, AntHill.prototype);
});