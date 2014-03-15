/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/pages/mvc/pages.controller',
    'plugins/pages/mvc/pages.model',
    'plugins/pages/mvc/pages.view',
    'plugins/pages/mvc/pages.event.manager',
    'plugins/pages/mvc/pages.permission'
], function definePages(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Pages
     * @constructor
     * @param containment
     * @class Pages
     * @extends AntHill
     */
    var Pages = function Pages(containment) {

        /**
         * Define containment
         * @member Pages
         */
        this.containment = containment;

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
                header: true,
                footer: false,
                floating: true,
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
         * @member Pages
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Pages
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Pages
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
         * @member Pages
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
            ['plugins/pages/translations/en-us']
        );
    };

    return Pages.extend({

    }, AntHill.prototype);
});