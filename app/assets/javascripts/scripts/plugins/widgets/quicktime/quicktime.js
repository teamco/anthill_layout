/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/quicktime/mvc/quicktime.controller',
    'plugins/widgets/quicktime/mvc/quicktime.model',
    'plugins/widgets/quicktime/mvc/quicktime.view',
    'plugins/widgets/quicktime/mvc/quicktime.event.manager',
    'plugins/widgets/quicktime/mvc/quicktime.permission'
], function defineQuicktime(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Quicktime
     * @param containment
     * @param [opts]
     * @constructor
     * @class Quicktime
     * @extends AntHill
     */
    var Quicktime = function Quicktime(containment, opts) {

        /**
         * Define containment
         * @member Quicktime
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Quicktime
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
         *      },
         *      regex: RegExp,
         *      mask: string
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
            },
            regex: /^.*(?:quicktime\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,
            mask: '<iframe id="ytplayer" type="text/html" width="100%" height="100%" scrolling="no" allowtransparency="true" src="https://www.quicktime.com/embed/{{videoId}}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen>'
        };

        /**
         * Init observer
         * @member Quicktime
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Quicktime
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Quicktime
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Quicktime
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Quicktime
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

    return Quicktime.extend('Quicktime', {

    }, AntHill.prototype);
});