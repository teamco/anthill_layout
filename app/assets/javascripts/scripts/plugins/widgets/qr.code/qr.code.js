/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/qr.code/mvc/qr.code.controller',
    'plugins/widgets/qr.code/mvc/qr.code.model',
    'plugins/widgets/qr.code/mvc/qr.code.view',
    'plugins/widgets/qr.code/mvc/qr.code.event.manager',
    'plugins/widgets/qr.code/mvc/qr.code.permission'
], function defineQrCode(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define QrCode
     * @param containment
     * @param [opts]
     * @constructor
     * @class QrCode
     * @extends AntHill
     */
    var QrCode = function QrCode(containment, opts) {

        /**
         * Define containment
         * @memberOf QrCode
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf QrCode
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
         * @memberOf QrCode
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

    return QrCode.extend('QrCode', {

    }, AntHill.prototype);
});
