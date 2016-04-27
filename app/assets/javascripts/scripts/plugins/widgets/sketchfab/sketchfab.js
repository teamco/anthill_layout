/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/sketchfab/mvc/sketchfab.controller',
    'plugins/widgets/sketchfab/mvc/sketchfab.model',
    'plugins/widgets/sketchfab/mvc/sketchfab.view',
    'plugins/widgets/sketchfab/mvc/sketchfab.event.manager',
    'plugins/widgets/sketchfab/mvc/sketchfab.permission'
], function defineSketchfab(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Sketchfab
     * @param containment
     * @param [opts]
     * @constructor
     * @class Sketchfab
     * @extends AntHill
     */
    var Sketchfab = function Sketchfab(containment, opts) {

        /**
         * Define containment
         * @property Sketchfab
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Sketchfab
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
         * @property Sketchfab
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

    return Sketchfab.extend('Sketchfab', {}, AntHill.prototype);
});
