/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/text.editor/mvc/text.editor.controller',
    'plugins/widgets/text.editor/mvc/text.editor.model',
    'plugins/widgets/text.editor/mvc/text.editor.view',
    'plugins/widgets/text.editor/mvc/text.editor.event.manager',
    'plugins/widgets/text.editor/mvc/text.editor.permission'
], function defineTextEditor(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TextEditor
     * @param containment
     * @constructor
     * @class TextEditor
     * @extends AntHill
     */
    var TextEditor = function TextEditor(containment) {

        /**
         * Define containment
         * @member TextEditor
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member TextEditor
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
         * @member TextEditor
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member TextEditor
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member TextEditor
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member TextEditor
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member TextEditor
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
            this.eventmanager.eventList.initWidget
        );
    };

    return TextEditor.extend('TextEditor', {

    }, AntHill.prototype);
});