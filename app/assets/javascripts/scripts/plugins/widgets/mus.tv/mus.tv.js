/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/mus.tv/mvc/mus.tv.controller',
    'plugins/widgets/mus.tv/mvc/mus.tv.model',
    'plugins/widgets/mus.tv/mvc/mus.tv.view',
    'plugins/widgets/mus.tv/mvc/mus.tv.event.manager',
    'plugins/widgets/mus.tv/mvc/mus.tv.permission'
], function defineMusTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define MusTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class MusTv
     * @extends AntHill
     */
    var MusTv = function MusTv(containment, opts) {

        /**
         * Define containment
         * @memberOf MusTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf MusTv
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
            mask: 'https://www.youtube.com/embed/{videoId}'
        };

        /**
         * Define MVC
         * @memberOf MusTv
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

    return MusTv.extend('MusTv', {

    }, AntHill.prototype);
});
