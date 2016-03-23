/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/maximize/mvc/maximize.controller',
    'plugins/maximize/mvc/maximize.model',
    'plugins/maximize/mvc/maximize.view',
    'plugins/maximize/mvc/maximize.event.manager',
    'plugins/maximize/mvc/maximize.permission'
], function defineMaximize(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Maximize
     * @constructor
     * @param containment
     * @class Maximize
     * @extends AntHill
     */
    var Maximize = function Maximize(containment) {

        /**
         * Define containment
         * @property Maximize
         */
        this.containment = containment;

        /**
         * Define active content
         * @property Maximize
         * @type {*}
         */
        this.activeContent = undefined;

        /**
         * Allow to locate element
         * @property Maximize
         * @type {boolean}
         */
        this.allowToLocate = true;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      getter: boolean,
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
            getter: true,
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
         * @property Maximize
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
            ['plugins/maximize/translations/en-us']
        );

        this.controller.subscribeRefreshContentAfterDestroyItems();
        this.controller.subscribeRefreshContentSwitchPage();
    };

    return Maximize.extend('Maximize', {}, AntHill.prototype);
});