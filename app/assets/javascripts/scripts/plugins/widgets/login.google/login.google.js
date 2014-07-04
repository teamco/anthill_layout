/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/login.google/mvc/login.google.controller',
    'plugins/widgets/login.google/mvc/login.google.model',
    'plugins/widgets/login.google/mvc/login.google.view',
    'plugins/widgets/login.google/mvc/login.google.event.manager',
    'plugins/widgets/login.google/mvc/login.google.permission'
], function defineLoginGoogle(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define LoginGoogle
     * @param containment
     * @param [opts]
     * @constructor
     * @class LoginGoogle
     * @extends AntHill
     */
    var LoginGoogle = function LoginGoogle(containment, opts) {

        /**
         * Define containment
         * @member LoginGoogle
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member LoginGoogle
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
         * Init observer
         * @member LoginGoogle
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member LoginGoogle
         * @type {LoginGoogleEventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member LoginGoogle
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member LoginGoogle
         * @type {LoginGoogleModel}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member LoginGoogle
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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

    return LoginGoogle.extend('LoginGoogle', {

    }, AntHill.prototype);
});