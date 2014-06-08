/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/dropbox/mvc/dropbox.controller',
    'plugins/widgets/dropbox/mvc/dropbox.model',
    'plugins/widgets/dropbox/mvc/dropbox.view',
    'plugins/widgets/dropbox/mvc/dropbox.event.manager',
    'plugins/widgets/dropbox/mvc/dropbox.permission'
], function defineDropbox(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Dropbox
     * @param containment
     * @param [opts]
     * @constructor
     * @class Dropbox
     * @extends AntHill
     */
    var Dropbox = function Dropbox(containment, opts) {

        /**
         * Define containment
         * @member Dropbox
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Dropbox
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
         * @member Dropbox
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Dropbox
         * @type {DropboxEventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Dropbox
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Dropbox
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Dropbox
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

    return Dropbox.extend('Dropbox', {

    }, AntHill.prototype);
});