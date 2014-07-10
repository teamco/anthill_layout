/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/site.preferences/mvc/site.preferences.controller',
    'plugins/site.preferences/mvc/site.preferences.model',
    'plugins/site.preferences/mvc/site.preferences.view',
    'plugins/site.preferences/mvc/site.preferences.event.manager',
    'plugins/site.preferences/mvc/site.preferences.permission'
], function defineSitePreferences(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SitePreferences
     * @constructor
     * @param containment
     * @class SitePreferences
     * @extends AntHill
     */
    var SitePreferences = function SitePreferences(containment) {

        /**
         * Define containment
         * @member SitePreferences
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
         * @member SitePreferences
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
            ['plugins/site.preferences/translations/en-us']
        );
    };

    return SitePreferences.extend('SitePreferences', {

    }, AntHill.prototype);
});