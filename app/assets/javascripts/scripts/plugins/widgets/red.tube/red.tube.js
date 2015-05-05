/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/red.tube/mvc/red.tube.controller',
    'plugins/widgets/red.tube/mvc/red.tube.model',
    'plugins/widgets/red.tube/mvc/red.tube.view',
    'plugins/widgets/red.tube/mvc/red.tube.event.manager',
    'plugins/widgets/red.tube/mvc/red.tube.permission'
], function defineRedTube(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define RedTube
     * @param containment
     * @param [opts]
     * @constructor
     * @class RedTube
     * @extends AntHill
     */
    var RedTube = function RedTube(containment, opts) {

        /**
         * Define containment
         * @memberOf RedTube
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf RedTube
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
            },
            regex: /\d+/,
            mask: 'http://embed.redtube.com/?id={id}&bgcolor=000000'
        };

        /**
         * Define MVC
         * @memberOf RedTube
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

    return RedTube.extend('RedTube', {

    }, AntHill.prototype);
});
