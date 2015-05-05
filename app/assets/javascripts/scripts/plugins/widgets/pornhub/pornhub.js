/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pornhub/mvc/pornhub.controller',
    'plugins/widgets/pornhub/mvc/pornhub.model',
    'plugins/widgets/pornhub/mvc/pornhub.view',
    'plugins/widgets/pornhub/mvc/pornhub.event.manager',
    'plugins/widgets/pornhub/mvc/pornhub.permission'
], function definePornhub(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Pornhub
     * @param containment
     * @param [opts]
     * @constructor
     * @class Pornhub
     * @extends AntHill
     */
    var Pornhub = function Pornhub(containment, opts) {

        /**
         * Define containment
         * @memberOf Pornhub
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Pornhub
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
            },
            regex: /\d+/,
            mask: 'http://www.pornhub.com/embed/{id}'
        };

        /**
         * Define MVC
         * @memberOf Pornhub
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
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return Pornhub.extend('Pornhub', {

    }, AntHill.prototype);
});
