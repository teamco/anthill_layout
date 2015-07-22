/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/google.plus/mvc/google.plus.controller',
    'plugins/widgets/google.plus/mvc/google.plus.model',
    'plugins/widgets/google.plus/mvc/google.plus.view',
    'plugins/widgets/google.plus/mvc/google.plus.event.manager',
    'plugins/widgets/google.plus/mvc/google.plus.permission'
], function defineGooglePlus(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define GooglePlus
     * @param containment
     * @param [opts]
     * @constructor
     * @class GooglePlus
     * @extends AntHill
     */
    var GooglePlus = function GooglePlus(containment, opts) {

        /**
         * Define containment
         * @memberOf GooglePlus
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf GooglePlus
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
         * @memberOf GooglePlus
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

    return GooglePlus.extend('GooglePlus', {

    }, AntHill.prototype);
});
