/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'modules/mvc',
    'plugins/widgets/youtube/mvc/youtube.controller',
    'plugins/widgets/youtube/mvc/youtube.model',
    'plugins/widgets/youtube/mvc/youtube.view',
    'plugins/widgets/youtube/mvc/youtube.event.manager',
    'plugins/widgets/youtube/mvc/youtube.permission'
], function defineYoutube(MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Youtube
     * @param containment
     * @constructor
     * @class Youtube
     */
    var Youtube = function Youtube(containment) {

        /**
         * Define containment
         */
        this.containment = containment;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
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
         * Init observer
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @type {MVC}
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

        this.observer.publish(
            this.eventmanager.eventList.initWidget
        );
    };

    return Youtube;
});