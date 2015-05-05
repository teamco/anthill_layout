/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/page.tabs/mvc/page.tabs.controller',
    'plugins/widgets/page.tabs/mvc/page.tabs.model',
    'plugins/widgets/page.tabs/mvc/page.tabs.view',
    'plugins/widgets/page.tabs/mvc/page.tabs.event.manager',
    'plugins/widgets/page.tabs/mvc/page.tabs.permission'
], function definePageTabs(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PageTabs
     * @param containment
     * @param [opts]
     * @constructor
     * @class PageTabs
     * @extends AntHill
     */
    var PageTabs = function PageTabs(containment, opts) {

        /**
         * Define containment
         * @memberOf PageTabs
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PageTabs
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
         * Define MVC
         * @memberOf PageTabs
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
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
            this.eventManager.eventList.initWidget,
            opts
        );

        this.init();
    };

    return PageTabs.extend('PageTabs', {

        /**
         * Define init
         * @memberOf PageTabs
         */
        init: function init() {

            this.observer.batchPublish(
                this.eventManager.eventList.subscribeOrderPagesEvent,
                this.eventManager.eventList.subscribeAfterSwitchPageEvent,
                this.eventManager.eventList.subscribeCreatePageEvent,
                this.eventManager.eventList.subscribeDestroyPageEvent,
                this.eventManager.eventList.subscribeChangePageTitleEvent
            );
        }

    }, AntHill.prototype);
});