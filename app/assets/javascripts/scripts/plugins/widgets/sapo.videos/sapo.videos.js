/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/sapo.videos/mvc/sapo.videos.controller',
    'plugins/widgets/sapo.videos/mvc/sapo.videos.model',
    'plugins/widgets/sapo.videos/mvc/sapo.videos.view',
    'plugins/widgets/sapo.videos/mvc/sapo.videos.event.manager',
    'plugins/widgets/sapo.videos/mvc/sapo.videos.permission'
], function defineSapoVideos(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SapoVideos
     * @param containment
     * @param [opts]
     * @constructor
     * @class SapoVideos
     * @extends AntHill
     */
    var SapoVideos = function SapoVideos(containment, opts) {

        /**
         * Define containment
         * @property SapoVideos
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property SapoVideos
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
         * @property SapoVideos
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

    return SapoVideos.extend('SapoVideos', {}, AntHill.prototype);
});
