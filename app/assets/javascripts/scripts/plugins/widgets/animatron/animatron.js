/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/animatron/mvc/animatron.controller',
    'plugins/widgets/animatron/mvc/animatron.model',
    'plugins/widgets/animatron/mvc/animatron.view',
    'plugins/widgets/animatron/mvc/animatron.event.manager',
    'plugins/widgets/animatron/mvc/animatron.permission'
], function defineAnimatron(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Animatron
     * @param containment
     * @param [opts]
     * @constructor
     * @class Animatron
     * @extends AntHill
     */
    var Animatron = function Animatron(containment, opts) {

        /**
         * Define containment
         * @property Animatron
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Animatron
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
         * @property Animatron
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

    return Animatron.extend('Animatron', {}, AntHill.prototype);
});
