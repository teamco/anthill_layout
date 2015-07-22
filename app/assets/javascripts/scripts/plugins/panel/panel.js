/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/panel/mvc/panel.controller',
    'plugins/panel/mvc/panel.model',
    'plugins/panel/mvc/panel.view',
    'plugins/panel/mvc/panel.event.manager',
    'plugins/panel/mvc/panel.permission'
], function definePanel(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Panel
     * @param opts
     * @param containment
     * @constructor
     * @class Panel
     * @extends AntHill
     */
    var Panel = function Panel(opts, containment) {

        /**
         * Define containment
         * @memberOf Panel
         */
        this.containment = containment;

        /**
         * Define opened
         * @memberOf Panel
         * @type {boolean}
         */
        this.opened = false;

        /**
         * Define active module
         * @type {string}
         */
        this.active = undefined;

        /**
         * Render side
         * @type {{top: string, right: string, bottom: string, left: string}}
         */
        var RENDER_AT = {
            top: 'top',
            right: 'right',
            bottom: 'bottom',
            left: 'left'
        };

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          width: {
         *              min: number,
         *              max: number
         *          },
         *          style: string,
         *          resizable: boolean,
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
            renderAt: RENDER_AT.right,
            html: {
                width: {
                    min: 5,
                    max: 215
                },
                resizable: false,
                style: 'default',
                header: true,
                footer: false,
                floating: false,
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
         * @memberOf Panel
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                this.base.define(opts, {}, true).config,
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
            this.eventmanager.eventList.successCreated
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/panel/translations/en-us']
        );

        this.observer.publish(
            this.eventmanager.eventList.defineModules,
            [opts.modules]
        );

        this.observer.publish(
            this.eventmanager.eventList.definePackages,
            [opts.packages]
        );

        this.observer.publish(
            this.eventmanager.eventList.subscribeGenericEvent
        );
    };

    return Panel.extend('Panel', {

    }, AntHill.prototype);

});