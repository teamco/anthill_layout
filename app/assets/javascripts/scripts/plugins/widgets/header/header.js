/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/header/mvc/header.controller',
    'plugins/widgets/header/mvc/header.model',
    'plugins/widgets/header/mvc/header.view',
    'plugins/widgets/header/mvc/header.event.manager',
    'plugins/widgets/header/mvc/header.permission'
], function defineHeader(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Header
     * @param containment
     * @param [opts]
     * @constructor
     * @class Header
     * @extends AntHill
     */
    var Header = function Header(containment, opts) {

        /**
         * Define containment
         * @member Header
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Header
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
         * @member Header
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

    return Header.extend('Header', {

    }, AntHill.prototype);
});