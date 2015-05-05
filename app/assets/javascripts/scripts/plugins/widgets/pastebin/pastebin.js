/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pastebin/mvc/pastebin.controller',
    'plugins/widgets/pastebin/mvc/pastebin.model',
    'plugins/widgets/pastebin/mvc/pastebin.view',
    'plugins/widgets/pastebin/mvc/pastebin.event.manager',
    'plugins/widgets/pastebin/mvc/pastebin.permission'
], function definePastebin(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Pastebin
     * @param containment
     * @param [opts]
     * @constructor
     * @class Pastebin
     * @extends AntHill
     */
    var Pastebin = function Pastebin(containment, opts) {

        /**
         * Define containment
         * @memberOf Pastebin
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Pastebin
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
         * @memberOf Pastebin
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

    return Pastebin.extend('Pastebin', {

    }, AntHill.prototype);
});
