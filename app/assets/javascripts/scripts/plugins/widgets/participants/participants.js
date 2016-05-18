/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/participants/mvc/participants.controller',
    'plugins/widgets/participants/mvc/participants.model',
    'plugins/widgets/participants/mvc/participants.view',
    'plugins/widgets/participants/mvc/participants.event.manager',
    'plugins/widgets/participants/mvc/participants.permission'
], function defineParticipants(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Participants
     * @param containment
     * @param [opts]
     * @constructor
     * @class Participants
     * @extends AntHill
     */
    var Participants = function Participants(containment, opts) {

        /**
         * Define containment
         * @property Participants
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Participants
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
         * @property Participants
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

    return Participants.extend('Participants', {}, AntHill.prototype);
});
