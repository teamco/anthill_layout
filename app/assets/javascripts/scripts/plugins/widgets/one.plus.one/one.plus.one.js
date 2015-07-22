/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/one.plus.one/mvc/one.plus.one.controller',
    'plugins/widgets/one.plus.one/mvc/one.plus.one.model',
    'plugins/widgets/one.plus.one/mvc/one.plus.one.view',
    'plugins/widgets/one.plus.one/mvc/one.plus.one.event.manager',
    'plugins/widgets/one.plus.one/mvc/one.plus.one.permission'
], function defineOnePlusOne(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define OnePlusOne
     * @param containment
     * @param [opts]
     * @constructor
     * @class OnePlusOne
     * @extends AntHill
     */
    var OnePlusOne = function OnePlusOne(containment, opts) {

        /**
         * Define containment
         * @memberOf OnePlusOne
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf OnePlusOne
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
         * @memberOf OnePlusOne
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

    return OnePlusOne.extend('OnePlusOne', {

    }, AntHill.prototype);
});
