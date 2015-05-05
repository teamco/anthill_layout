/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/login/mvc/login.controller',
    'plugins/widgets/login/mvc/login.model',
    'plugins/widgets/login/mvc/login.view',
    'plugins/widgets/login/mvc/login.event.manager',
    'plugins/widgets/login/mvc/login.permission'
], function defineLogin(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Login
     * @param containment
     * @param [opts]
     * @constructor
     * @class Login
     * @extends AntHill
     */
    var Login = function Login(containment, opts) {

        /**
         * Define containment
         * @memberOf Login
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Login
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
         * @memberOf Login
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return Login.extend('Login', {

    }, AntHill.prototype);
});