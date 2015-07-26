/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/embedly/mvc/embedly.controller',
    'plugins/widgets/embedly/mvc/embedly.model',
    'plugins/widgets/embedly/mvc/embedly.view',
    'plugins/widgets/embedly/mvc/embedly.event.manager',
    'plugins/widgets/embedly/mvc/embedly.permission'
], function defineEmbedly(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Embedly
     * @param containment
     * @param [opts]
     * @constructor
     * @class Embedly
     * @extends AntHill
     */
    var Embedly = function Embedly(containment, opts) {

        /**
         * Define containment
         * @property Embedly
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Embedly
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
         *      },
         *      routes: {getContent: array}
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
            routes: {
                getContent: ['/embedly.json', 'get']
            }
        };

        /**
         * Define MVC
         * @property Embedly
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

    return Embedly.extend('Embedly', {}, AntHill.prototype);
});
