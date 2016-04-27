/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/reverbnation/mvc/reverbnation.controller',
    'plugins/widgets/reverbnation/mvc/reverbnation.model',
    'plugins/widgets/reverbnation/mvc/reverbnation.view',
    'plugins/widgets/reverbnation/mvc/reverbnation.event.manager',
    'plugins/widgets/reverbnation/mvc/reverbnation.permission'
], function defineReverbnation(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Reverbnation
     * @param containment
     * @param [opts]
     * @constructor
     * @class Reverbnation
     * @extends AntHill
     */
    var Reverbnation = function Reverbnation(containment, opts) {

        /**
         * Define containment
         * @property Reverbnation
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Reverbnation
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
         * @property Reverbnation
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

    return Reverbnation.extend('Reverbnation', {}, AntHill.prototype);
});
