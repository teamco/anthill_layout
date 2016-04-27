/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/getty.images/mvc/getty.images.controller',
    'plugins/widgets/getty.images/mvc/getty.images.model',
    'plugins/widgets/getty.images/mvc/getty.images.view',
    'plugins/widgets/getty.images/mvc/getty.images.event.manager',
    'plugins/widgets/getty.images/mvc/getty.images.permission'
], function defineGettyImages(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define GettyImages
     * @param containment
     * @param [opts]
     * @constructor
     * @class GettyImages
     * @extends AntHill
     */
    var GettyImages = function GettyImages(containment, opts) {

        /**
         * Define containment
         * @property GettyImages
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property GettyImages
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
         * @property GettyImages
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

    return GettyImages.extend('GettyImages', {}, AntHill.prototype);
});
