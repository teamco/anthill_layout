/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/giphy/mvc/giphy.controller',
    'plugins/widgets/giphy/mvc/giphy.model',
    'plugins/widgets/giphy/mvc/giphy.view',
    'plugins/widgets/giphy/mvc/giphy.event.manager',
    'plugins/widgets/giphy/mvc/giphy.permission'
], function defineGiphy(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Giphy
     * @param containment
     * @param [opts]
     * @constructor
     * @class Giphy
     * @extends AntHill
     */
    var Giphy = function Giphy(containment, opts) {

        /**
         * Define containment
         * @memberOf Giphy
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Giphy
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
         * @memberOf Giphy
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

    return Giphy.extend('Giphy', {

    }, AntHill.prototype);
});
