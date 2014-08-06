/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/youtube/mvc/youtube.controller',
    'plugins/widgets/youtube/mvc/youtube.model',
    'plugins/widgets/youtube/mvc/youtube.view',
    'plugins/widgets/youtube/mvc/youtube.event.manager',
    'plugins/widgets/youtube/mvc/youtube.permission'
], function defineYoutube(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Youtube
     * @param containment
     * @param [opts]
     * @constructor
     * @class Youtube
     * @extends AntHill
     */
    var Youtube = function Youtube(containment, opts) {

        /**
         * Define containment
         * @memberOf Youtube
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Youtube
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
         *      regex: RegExp,
         *      mask: string
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
            regex: /^.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
            mask: '<iframe id="ytplayer" type="text/html" width="100%" height="100%" scrolling="no" allowtransparency="true" src="https://www.youtube.com/embed/{{videoId}}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen>'
        };

        /**
         * Define MVC
         * @memberOf Youtube
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

    return Youtube.extend('Youtube', {

    }, AntHill.prototype);
});