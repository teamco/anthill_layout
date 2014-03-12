/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
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
     */
    var Panel = function Panel(opts, containment) {

        /**
         * Define containment
         */
        this.containment = containment;

        /**
         * Define opened
         * @type {boolean}
         */
        this.opened = false;

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
                resizable: true,
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
         * Init observer
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
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
    };

    return Panel.extend({

    }, AntHill.prototype);

});