/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/paypal.button/mvc/paypal.button.controller',
    'plugins/widgets/paypal.button/mvc/paypal.button.model',
    'plugins/widgets/paypal.button/mvc/paypal.button.view',
    'plugins/widgets/paypal.button/mvc/paypal.button.event.manager',
    'plugins/widgets/paypal.button/mvc/paypal.button.permission'
], function definePaypalButton(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PaypalButton
     * @param containment
     * @param [opts]
     * @constructor
     * @class PaypalButton
     * @extends AntHill
     */
    var PaypalButton = function PaypalButton(containment, opts) {

        /**
         * Define containment
         * @property PaypalButton
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property PaypalButton
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
         * @property PaypalButton
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

    return PaypalButton.extend('PaypalButton', {}, AntHill.prototype);
});
