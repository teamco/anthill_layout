/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/espreso.tv/mvc/espreso.tv.controller',
    'plugins/widgets/espreso.tv/mvc/espreso.tv.model',
    'plugins/widgets/espreso.tv/mvc/espreso.tv.view',
    'plugins/widgets/espreso.tv/mvc/espreso.tv.event.manager',
    'plugins/widgets/espreso.tv/mvc/espreso.tv.permission'
], function defineEspresoTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define EspresoTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class EspresoTv
     * @extends AntHill
     */
    var EspresoTv = function EspresoTv(containment, opts) {

        /**
         * Define containment
         * @memberOf EspresoTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf EspresoTv
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
         * @memberOf EspresoTv
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return EspresoTv.extend('EspresoTv', {

    }, AntHill.prototype);
});
