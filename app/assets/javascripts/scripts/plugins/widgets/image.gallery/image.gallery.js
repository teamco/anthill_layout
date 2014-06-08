/**
 * Created with RubyMine.
 * User: i061485
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
     * @member WidgetContent
     */
    var ImageGallery = function ImageGallery(containment, opts) {

        /**
         * Define containment
         * @member ImageGallery
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member ImageGallery
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
         * Init observer
         * @member ImageGallery
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member ImageGallery
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member ImageGallery
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member ImageGallery
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member ImageGallery
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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