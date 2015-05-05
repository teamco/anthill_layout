/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/ted/mvc/ted.controller',
    'plugins/widgets/ted/mvc/ted.model',
    'plugins/widgets/ted/mvc/ted.view',
    'plugins/widgets/ted/mvc/ted.event.manager',
    'plugins/widgets/ted/mvc/ted.permission'
], function defineTed(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Ted
     * @param containment
     * @param [opts]
     * @constructor
     * @class Ted
     * @extends AntHill
     */
    var Ted = function Ted(containment, opts) {

        /**
         * Define containment
         * @memberOf Ted
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Ted
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
         * @memberOf Ted
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

    return Ted.extend('Ted', {

    }, AntHill.prototype);
});
