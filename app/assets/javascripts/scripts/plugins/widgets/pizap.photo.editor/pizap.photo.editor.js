/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/pizap.photo.editor/mvc/pizap.photo.editor.controller',
    'plugins/widgets/pizap.photo.editor/mvc/pizap.photo.editor.model',
    'plugins/widgets/pizap.photo.editor/mvc/pizap.photo.editor.view',
    'plugins/widgets/pizap.photo.editor/mvc/pizap.photo.editor.event.manager',
    'plugins/widgets/pizap.photo.editor/mvc/pizap.photo.editor.permission'
], function definePizapPhotoEditor(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PizapPhotoEditor
     * @param containment
     * @param [opts]
     * @constructor
     * @class PizapPhotoEditor
     * @extends AntHill
     */
    var PizapPhotoEditor = function PizapPhotoEditor(containment, opts) {

        /**
         * Define containment
         * @property PizapPhotoEditor
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property PizapPhotoEditor
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
         * @property PizapPhotoEditor
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

    return PizapPhotoEditor.extend('PizapPhotoEditor', {}, AntHill.prototype);
});
