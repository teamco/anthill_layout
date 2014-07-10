/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/site/mvc/site.controller',
    'plugins/site/mvc/site.model',
    'plugins/site/mvc/site.view',
    'plugins/site/mvc/site.event.manager',
    'plugins/site/mvc/site.permission'
], function defineSite(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Site
     * @constructor
     * @param containment
     * @class Site
     * @extends AntHill
     */
    var Site = function Site(containment) {

        /**
         * Define containment
         * @member Site
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
                footer: true,
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
         * Define MVC
         * @member Site
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
            ['plugins/site/translations/en-us']
        );
    };

    return Site.extend('Site', {

    }, AntHill.prototype);
});