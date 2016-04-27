/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/oumy/mvc/oumy.controller',
    'plugins/widgets/oumy/mvc/oumy.model',
    'plugins/widgets/oumy/mvc/oumy.view',
    'plugins/widgets/oumy/mvc/oumy.event.manager',
    'plugins/widgets/oumy/mvc/oumy.permission'
], function defineOumy(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Oumy
     * @param containment
     * @param [opts]
     * @constructor
     * @class Oumy
     * @extends AntHill
     */
    var Oumy = function Oumy(containment, opts) {

        /**
         * Define containment
         * @property Oumy
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Oumy
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
         * @property Oumy
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

    return Oumy.extend('Oumy', {}, AntHill.prototype);
});
