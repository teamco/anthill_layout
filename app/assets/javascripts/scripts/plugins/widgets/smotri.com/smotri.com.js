/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/smotri.com/mvc/smotri.com.controller',
    'plugins/widgets/smotri.com/mvc/smotri.com.model',
    'plugins/widgets/smotri.com/mvc/smotri.com.view',
    'plugins/widgets/smotri.com/mvc/smotri.com.event.manager',
    'plugins/widgets/smotri.com/mvc/smotri.com.permission'
], function defineSmotriCom(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SmotriCom
     * @param containment
     * @param [opts]
     * @constructor
     * @class SmotriCom
     * @extends AntHill
     */
    var SmotriCom = function SmotriCom(containment, opts) {

        /**
         * Define containment
         * @memberOf SmotriCom
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf SmotriCom
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
         * @memberOf SmotriCom
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

    return SmotriCom.extend('SmotriCom', {

    }, AntHill.prototype);
});
