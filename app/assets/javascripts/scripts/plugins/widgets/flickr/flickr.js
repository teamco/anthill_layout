/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/flickr/mvc/flickr.controller',
    'plugins/widgets/flickr/mvc/flickr.model',
    'plugins/widgets/flickr/mvc/flickr.view',
    'plugins/widgets/flickr/mvc/flickr.event.manager',
    'plugins/widgets/flickr/mvc/flickr.permission'
], function defineFlickr(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Flickr
     * @param containment
     * @param [opts]
     * @constructor
     * @class Flickr
     * @extends AntHill
     */
    var Flickr = function Flickr(containment, opts) {

        /**
         * Define containment
         * @property Flickr
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Flickr
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
         * @property Flickr
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

    return Flickr.extend('Flickr', {

    }, AntHill.prototype);
});
