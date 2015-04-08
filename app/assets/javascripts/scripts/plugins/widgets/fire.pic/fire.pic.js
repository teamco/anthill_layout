/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/fire.pic/mvc/fire.pic.controller',
    'plugins/widgets/fire.pic/mvc/fire.pic.model',
    'plugins/widgets/fire.pic/mvc/fire.pic.view',
    'plugins/widgets/fire.pic/mvc/fire.pic.event.manager',
    'plugins/widgets/fire.pic/mvc/fire.pic.permission'
], function defineFirePic(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FirePic
     * @param containment
     * @param [opts]
     * @constructor
     * @class FirePic
     * @extends AntHill
     */
    var FirePic = function FirePic(containment, opts) {

        /**
         * Define containment
         * @memberOf FirePic
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf FirePic
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
         *      },
         *      regex: RegExp,
         *      mask: string
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
         * @memberOf FirePic
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

    return FirePic.extend('FirePic', {

    }, AntHill.prototype);
});
