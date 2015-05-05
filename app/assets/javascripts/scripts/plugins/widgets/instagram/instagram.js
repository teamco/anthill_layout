/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/instagram/mvc/instagram.controller',
    'plugins/widgets/instagram/mvc/instagram.model',
    'plugins/widgets/instagram/mvc/instagram.view',
    'plugins/widgets/instagram/mvc/instagram.event.manager',
    'plugins/widgets/instagram/mvc/instagram.permission'
], function defineInstagram(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Instagram
     * @param containment
     * @param [opts]
     * @constructor
     * @class Instagram
     * @extends AntHill
     */
    var Instagram = function Instagram(containment, opts) {

        /**
         * Define containment
         * @memberOf Instagram
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Instagram
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
         * Define MVC
         * @memberOf Instagram
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
    };

    return Instagram.extend('Instagram', {

    }, AntHill.prototype);
});
