/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/twitr.pix/mvc/twitr.pix.controller',
    'plugins/widgets/twitr.pix/mvc/twitr.pix.model',
    'plugins/widgets/twitr.pix/mvc/twitr.pix.view',
    'plugins/widgets/twitr.pix/mvc/twitr.pix.event.manager',
    'plugins/widgets/twitr.pix/mvc/twitr.pix.permission'
], function defineTwitrPix(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TwitrPix
     * @param containment
     * @param [opts]
     * @constructor
     * @class TwitrPix
     * @extends AntHill
     */
    var TwitrPix = function TwitrPix(containment, opts) {

        /**
         * Define containment
         * @memberOf TwitrPix
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf TwitrPix
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
            }
        };

        /**
         * Define MVC
         * @memberOf TwitrPix
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

    return TwitrPix.extend('TwitrPix', {

    }, AntHill.prototype);
});
