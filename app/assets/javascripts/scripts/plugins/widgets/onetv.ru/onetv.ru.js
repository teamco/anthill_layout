/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/onetv.ru/mvc/onetv.ru.controller',
    'plugins/widgets/onetv.ru/mvc/onetv.ru.model',
    'plugins/widgets/onetv.ru/mvc/onetv.ru.view',
    'plugins/widgets/onetv.ru/mvc/onetv.ru.event.manager',
    'plugins/widgets/onetv.ru/mvc/onetv.ru.permission'
], function defineOnetvRu(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define OnetvRu
     * @param containment
     * @param [opts]
     * @constructor
     * @class OnetvRu
     * @extends AntHill
     */
    var OnetvRu = function OnetvRu(containment, opts) {

        /**
         * Define containment
         * @member OnetvRu
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member OnetvRu
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
         * @member OnetvRu
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

    return OnetvRu.extend('OnetvRu', {

    }, AntHill.prototype);
});
