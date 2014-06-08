/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/twits/mvc/twits.controller',
    'plugins/widgets/twits/mvc/twits.model',
    'plugins/widgets/twits/mvc/twits.view',
    'plugins/widgets/twits/mvc/twits.event.manager',
    'plugins/widgets/twits/mvc/twits.permission'
], function defineTwits(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Twits
     * @param containment
     * @param [opts]
     * @constructor
     * @class Twits
     * @extends AntHill
     */
    var Twits = function Twits(containment, opts) {

        /**
         * Define containment
         * @member Twits
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Twits
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
         * Init observer
         * @member Twits
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Twits
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Twits
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Twits
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Twits
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

    return Twits.extend('Twits', {

    }, AntHill.prototype);
});