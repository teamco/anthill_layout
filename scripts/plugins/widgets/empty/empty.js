/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/empty/mvc/empty.controller',
    'plugins/widgets/empty/mvc/empty.model',
    'plugins/widgets/empty/mvc/empty.view',
    'plugins/widgets/empty/mvc/empty.event.manager',
    'plugins/widgets/empty/mvc/empty.permission'
], function defineEmpty(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Empty
     * @param containment
     * @param [opts]
     * @constructor
     * @class Empty
     * @extends AntHill
     */
    var Empty = function Empty(containment, opts) {

        /**
         * Define containment
         * @member Empty
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Empty
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
         * @member Empty
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Empty
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Empty
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Empty
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Empty
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
            this.eventmanager.eventList.initWidget
        );

        this.observer.publish(
            this.eventmanager.eventList.transferEvents,
                (opts || {}).events || {}
        );
    };

    return Empty.extend('Empty', {

    }, AntHill.prototype);
});