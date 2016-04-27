/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/codepoints/mvc/codepoints.controller',
    'plugins/widgets/codepoints/mvc/codepoints.model',
    'plugins/widgets/codepoints/mvc/codepoints.view',
    'plugins/widgets/codepoints/mvc/codepoints.event.manager',
    'plugins/widgets/codepoints/mvc/codepoints.permission'
], function defineCodepoints(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Codepoints
     * @param containment
     * @param [opts]
     * @constructor
     * @class Codepoints
     * @extends AntHill
     */
    var Codepoints = function Codepoints(containment, opts) {

        /**
         * Define containment
         * @property Codepoints
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Codepoints
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
         * @property Codepoints
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

    return Codepoints.extend('Codepoints', {}, AntHill.prototype);
});
