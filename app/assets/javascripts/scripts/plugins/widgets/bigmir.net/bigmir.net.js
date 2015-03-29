/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/bigmir.net/mvc/bigmir.net.controller',
    'plugins/widgets/bigmir.net/mvc/bigmir.net.model',
    'plugins/widgets/bigmir.net/mvc/bigmir.net.view',
    'plugins/widgets/bigmir.net/mvc/bigmir.net.event.manager',
    'plugins/widgets/bigmir.net/mvc/bigmir.net.permission'
], function defineBigmirNet(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define BigmirNet
     * @param containment
     * @param [opts]
     * @constructor
     * @class BigmirNet
     * @extends AntHill
     */
    var BigmirNet = function BigmirNet(containment, opts) {

        /**
         * Define containment
         * @member BigmirNet
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member BigmirNet
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
         * @member BigmirNet
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

    return BigmirNet.extend('BigmirNet', {

    }, AntHill.prototype);
});