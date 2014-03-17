/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/bar/mvc/bar.controller',
    'plugins/bar/mvc/bar.model',
    'plugins/bar/mvc/bar.view',
    'plugins/bar/mvc/bar.event.manager',
    'plugins/bar/mvc/bar.permission'
], function defineBar(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Bar
     * @param containment
     * @constructor
     * @class Bar
     * @extends AntHill
     */
    var Bar = function Bar(containment) {

        /**
         * Define containment
         * @member Bar
         */
        this.containment = containment;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
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
         * @member Bar
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Bar
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Bar
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
         * @member Bar
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [DEFAULTS],
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
            this.eventmanager.eventList.successCreated
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/bar/translations/en-us']
        );
    };

    return Bar.extend('Bar', {

    }, AntHill.prototype);
});