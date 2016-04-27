/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/infogr.am/mvc/infogr.am.controller',
    'plugins/widgets/infogr.am/mvc/infogr.am.model',
    'plugins/widgets/infogr.am/mvc/infogr.am.view',
    'plugins/widgets/infogr.am/mvc/infogr.am.event.manager',
    'plugins/widgets/infogr.am/mvc/infogr.am.permission'
], function defineInfogrAm(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define InfogrAm
     * @param containment
     * @param [opts]
     * @constructor
     * @class InfogrAm
     * @extends AntHill
     */
    var InfogrAm = function InfogrAm(containment, opts) {

        /**
         * Define containment
         * @property InfogrAm
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property InfogrAm
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
         * @property InfogrAm
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

    return InfogrAm.extend('InfogrAm', {}, AntHill.prototype);
});
