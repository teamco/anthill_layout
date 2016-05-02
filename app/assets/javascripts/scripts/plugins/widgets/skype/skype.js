/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/skype/mvc/skype.controller',
    'plugins/widgets/skype/mvc/skype.model',
    'plugins/widgets/skype/mvc/skype.view',
    'plugins/widgets/skype/mvc/skype.event.manager',
    'plugins/widgets/skype/mvc/skype.permission'
], function defineSkype(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Skype
     * @param containment
     * @param [opts]
     * @constructor
     * @class Skype
     * @extends AntHill
     */
    var Skype = function Skype(containment, opts) {

        /**
         * Define containment
         * @property Skype
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Skype
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
         * @property Skype
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

    return Skype.extend('Skype', {}, AntHill.prototype);
});
