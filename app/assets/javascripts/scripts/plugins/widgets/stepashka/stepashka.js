/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/stepashka/mvc/stepashka.controller',
    'plugins/widgets/stepashka/mvc/stepashka.model',
    'plugins/widgets/stepashka/mvc/stepashka.view',
    'plugins/widgets/stepashka/mvc/stepashka.event.manager',
    'plugins/widgets/stepashka/mvc/stepashka.permission'
], function defineStepashka(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Stepashka
     * @param containment
     * @param [opts]
     * @constructor
     * @class Stepashka
     * @extends AntHill
     */
    var Stepashka = function Stepashka(containment, opts) {

        /**
         * Define containment
         * @memberOf Stepashka
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Stepashka
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
         * @memberOf Stepashka
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

    return Stepashka.extend('Stepashka', {

    }, AntHill.prototype);
});
