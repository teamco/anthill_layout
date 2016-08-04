/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/accuweather.widget/mvc/accuweather.widget.controller',
    'plugins/widgets/accuweather.widget/mvc/accuweather.widget.model',
    'plugins/widgets/accuweather.widget/mvc/accuweather.widget.view',
    'plugins/widgets/accuweather.widget/mvc/accuweather.widget.event.manager',
    'plugins/widgets/accuweather.widget/mvc/accuweather.widget.permission'
], function defineAccuweatherWidget(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define AccuweatherWidget
     * @param containment
     * @param [opts]
     * @constructor
     * @class AccuweatherWidget
     * @extends AntHill
     */
    var AccuweatherWidget = function AccuweatherWidget(containment, opts) {

        /**
         * Define containment
         * @property AccuweatherWidget
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property AccuweatherWidget
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
         * @property AccuweatherWidget
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

    return AccuweatherWidget.extend('AccuweatherWidget', {}, AntHill.prototype);
});
