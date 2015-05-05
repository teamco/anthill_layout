/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/flip.pdf/mvc/flip.pdf.controller',
    'plugins/widgets/flip.pdf/mvc/flip.pdf.model',
    'plugins/widgets/flip.pdf/mvc/flip.pdf.view',
    'plugins/widgets/flip.pdf/mvc/flip.pdf.event.manager',
    'plugins/widgets/flip.pdf/mvc/flip.pdf.permission'
], function defineFlipPdf(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FlipPdf
     * @param containment
     * @param [opts]
     * @constructor
     * @class FlipPdf
     * @extends AntHill
     */
    var FlipPdf = function FlipPdf(containment, opts) {

        /**
         * Define containment
         * @memberOf FlipPdf
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf FlipPdf
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
         * @memberOf FlipPdf
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return FlipPdf.extend('FlipPdf', {

    }, AntHill.prototype);
});
