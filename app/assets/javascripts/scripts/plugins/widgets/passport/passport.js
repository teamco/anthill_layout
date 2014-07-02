/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/passport/mvc/passport.controller',
    'plugins/widgets/passport/mvc/passport.model',
    'plugins/widgets/passport/mvc/passport.view',
    'plugins/widgets/passport/mvc/passport.event.manager',
    'plugins/widgets/passport/mvc/passport.permission'
], function definePassport(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Passport
     * @param containment
     * @param [opts]
     * @constructor
     * @class Passport
     * @extends AntHill
     */
    var Passport = function Passport(containment, opts) {

        /**
         * Define containment
         * @member Passport
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Passport
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
         * @member Passport
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Passport
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Passport
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Passport
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Passport
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

    return Passport.extend('Passport', {

    }, AntHill.prototype);
});