/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/image.gallery/mvc/image.gallery.controller',
    'plugins/widgets/image.gallery/mvc/image.gallery.model',
    'plugins/widgets/image.gallery/mvc/image.gallery.view',
    'plugins/widgets/image.gallery/mvc/image.gallery.event.manager',
    'plugins/widgets/image.gallery/mvc/image.gallery.permission'
], function defineImageGallery(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define ImageGallery
     * @param containment
     * @param [opts]
     * @constructor
     * @class ImageGallery
     * @extends AntHill
     * @memberOf WidgetContent
     */
    var ImageGallery = function ImageGallery(containment, opts) {

        /**
         * Define containment
         * @memberOf ImageGallery
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf ImageGallery
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
         * @memberOf ImageGallery
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

    return ImageGallery.extend('ImageGallery', {

    }, AntHill.prototype);
});