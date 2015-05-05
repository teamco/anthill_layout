/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/slide.share/mvc/slide.share.controller',
    'plugins/widgets/slide.share/mvc/slide.share.model',
    'plugins/widgets/slide.share/mvc/slide.share.view',
    'plugins/widgets/slide.share/mvc/slide.share.event.manager',
    'plugins/widgets/slide.share/mvc/slide.share.permission'
], function defineSlideShare(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define SlideShare
     * @param containment
     * @param [opts]
     * @constructor
     * @class SlideShare
     * @extends AntHill
     */
    var SlideShare = function SlideShare(containment, opts) {

        /**
         * Define containment
         * @memberOf SlideShare
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf SlideShare
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
         * @memberOf SlideShare
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

    return SlideShare.extend('SlideShare', {

    }, AntHill.prototype);
});
