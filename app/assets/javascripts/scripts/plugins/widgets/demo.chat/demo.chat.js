/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/demo.chat/mvc/demo.chat.controller',
    'plugins/widgets/demo.chat/mvc/demo.chat.model',
    'plugins/widgets/demo.chat/mvc/demo.chat.view',
    'plugins/widgets/demo.chat/mvc/demo.chat.event.manager',
    'plugins/widgets/demo.chat/mvc/demo.chat.permission'
], function defineDemoChat(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define DemoChat
     * @param containment
     * @param [opts]
     * @constructor
     * @class DemoChat
     * @extends AntHill
     */
    var DemoChat = function DemoChat(containment, opts) {

        /**
         * Define containment
         * @property DemoChat
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property DemoChat
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
         * @property DemoChat
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

    return DemoChat.extend('DemoChat', {}, AntHill.prototype);
});
