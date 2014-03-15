/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/youtube/mvc/youtube.controller',
    'plugins/widgets/youtube/mvc/youtube.model',
    'plugins/widgets/youtube/mvc/youtube.view',
    'plugins/widgets/youtube/mvc/youtube.event.manager',
    'plugins/widgets/youtube/mvc/youtube.permission'
], function defineYoutube(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Youtube
     * @param containment
     * @constructor
     * @class Youtube
     * @extends AntHill
     */
    var Youtube = function Youtube(containment) {

        /**
         * Define containment
         * @member Youtube
         */
        this.containment = containment;

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
         * Init observer
         * @member Youtube
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Youtube
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Youtube
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Youtube
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Youtube
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

    return Youtube.extend({

    }, AntHill.prototype);
});