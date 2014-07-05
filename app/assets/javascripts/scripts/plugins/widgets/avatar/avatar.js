/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/avatar/mvc/avatar.controller',
    'plugins/widgets/avatar/mvc/avatar.model',
    'plugins/widgets/avatar/mvc/avatar.view',
    'plugins/widgets/avatar/mvc/avatar.event.manager',
    'plugins/widgets/avatar/mvc/avatar.permission'
], function defineAvatar(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Avatar
     * @param containment
     * @param [opts]
     * @constructor
     * @class Avatar
     * @extends AntHill
     */
    var Avatar = function Avatar(containment, opts) {

        /**
         * Define containment
         * @member Avatar
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Avatar
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
         * @member Avatar
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

    return Avatar.extend('Avatar', {

    }, AntHill.prototype);
});