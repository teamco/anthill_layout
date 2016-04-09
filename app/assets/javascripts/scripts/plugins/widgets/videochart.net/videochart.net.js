/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/videochart.net/mvc/videochart.net.controller',
    'plugins/widgets/videochart.net/mvc/videochart.net.model',
    'plugins/widgets/videochart.net/mvc/videochart.net.view',
    'plugins/widgets/videochart.net/mvc/videochart.net.event.manager',
    'plugins/widgets/videochart.net/mvc/videochart.net.permission'
], function defineVideochartNet(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define VideochartNet
     * @param containment
     * @param [opts]
     * @constructor
     * @class VideochartNet
     * @extends AntHill
     */
    var VideochartNet = function VideochartNet(containment, opts) {

        /**
         * Define containment
         * @property VideochartNet
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property VideochartNet
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
         * @property VideochartNet
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

    return VideochartNet.extend('VideochartNet', {}, AntHill.prototype);
});
