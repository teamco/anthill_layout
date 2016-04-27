/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/office.mix/mvc/office.mix.controller',
    'plugins/widgets/office.mix/mvc/office.mix.model',
    'plugins/widgets/office.mix/mvc/office.mix.view',
    'plugins/widgets/office.mix/mvc/office.mix.event.manager',
    'plugins/widgets/office.mix/mvc/office.mix.permission'
], function defineOfficeMix(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define OfficeMix
     * @param containment
     * @param [opts]
     * @constructor
     * @class OfficeMix
     * @extends AntHill
     */
    var OfficeMix = function OfficeMix(containment, opts) {

        /**
         * Define containment
         * @property OfficeMix
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property OfficeMix
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
         * @property OfficeMix
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

    return OfficeMix.extend('OfficeMix', {}, AntHill.prototype);
});
