/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/video.pay.net/mvc/video.pay.net.controller',
    'plugins/widgets/video.pay.net/mvc/video.pay.net.model',
    'plugins/widgets/video.pay.net/mvc/video.pay.net.view',
    'plugins/widgets/video.pay.net/mvc/video.pay.net.event.manager',
    'plugins/widgets/video.pay.net/mvc/video.pay.net.permission'
], function defineVideoPayNet(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define VideoPayNet
     * @param containment
     * @param [opts]
     * @constructor
     * @class VideoPayNet
     * @extends AntHill
     */
    var VideoPayNet = function VideoPayNet(containment, opts) {

        /**
         * Define containment
         * @memberOf VideoPayNet
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf VideoPayNet
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
         * @memberOf VideoPayNet
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

    return VideoPayNet.extend('VideoPayNet', {

    }, AntHill.prototype);
});
