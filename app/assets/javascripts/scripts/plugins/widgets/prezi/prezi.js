/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/prezi/mvc/prezi.controller',
    'plugins/widgets/prezi/mvc/prezi.model',
    'plugins/widgets/prezi/mvc/prezi.view',
    'plugins/widgets/prezi/mvc/prezi.event.manager',
    'plugins/widgets/prezi/mvc/prezi.permission'
], function definePrezi(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Prezi
     * @param containment
     * @param [opts]
     * @constructor
     * @class Prezi
     * @extends AntHill
     */
    var Prezi = function Prezi(containment, opts) {

        /**
         * Define containment
         * @member Prezi
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Prezi
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
         * @member Prezi
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

    return Prezi.extend('Prezi', {

    }, AntHill.prototype);
});
