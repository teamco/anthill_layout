/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/tinymce/mvc/tinymce.controller',
    'plugins/widgets/tinymce/mvc/tinymce.model',
    'plugins/widgets/tinymce/mvc/tinymce.view',
    'plugins/widgets/tinymce/mvc/tinymce.event.manager',
    'plugins/widgets/tinymce/mvc/tinymce.permission'
], function defineTinymce(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Tinymce
     * @param containment
     * @param [opts]
     * @constructor
     * @class Tinymce
     * @extends AntHill
     */
    var Tinymce = function Tinymce(containment, opts) {

        /**
         * Define containment
         * @property Tinymce
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property Tinymce
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
         * @property Tinymce
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

    return Tinymce.extend('Tinymce', {}, AntHill.prototype);
});
