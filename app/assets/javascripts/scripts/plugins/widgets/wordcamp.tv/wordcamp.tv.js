/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/wordcamp.tv/mvc/wordcamp.tv.controller',
    'plugins/widgets/wordcamp.tv/mvc/wordcamp.tv.model',
    'plugins/widgets/wordcamp.tv/mvc/wordcamp.tv.view',
    'plugins/widgets/wordcamp.tv/mvc/wordcamp.tv.event.manager',
    'plugins/widgets/wordcamp.tv/mvc/wordcamp.tv.permission'
], function defineWordcampTv(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define WordcampTv
     * @param containment
     * @param [opts]
     * @constructor
     * @class WordcampTv
     * @extends AntHill
     */
    var WordcampTv = function WordcampTv(containment, opts) {

        /**
         * Define containment
         * @memberOf WordcampTv
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf WordcampTv
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
            }
        };

        /**
         * Define MVC
         * @memberOf WordcampTv
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

    return WordcampTv.extend('WordcampTv', {

    }, AntHill.prototype);
});
