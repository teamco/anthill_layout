/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'modules/mvc',
    'plugins/gallery/mvc/gallery.controller',
    'plugins/gallery/mvc/gallery.model',
    'plugins/gallery/mvc/gallery.view',
    'plugins/gallery/mvc/gallery.event.manager',
    'plugins/gallery/mvc/gallery.permission'
], function defineGallery(MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Gallery
     * @constructor
     * @param containment
     * @class Gallery
     */
    var Gallery = function Gallery(containment) {

        /**
         * Define containment
         */
        this.containment = containment;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          width: {
         *              min: number,
         *              max: number
         *          },
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
                header: true,
                footer: false,
                floating: true,
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
            config: [DEFAULTS],
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
            ['plugins/gallery/translations/en-us']
        );
    };

    return Gallery;
});