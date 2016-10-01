/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/tut.by/mvc/tut.by.controller',
    'plugins/widgets/tut.by/mvc/tut.by.model',
    'plugins/widgets/tut.by/mvc/tut.by.view',
    'plugins/widgets/tut.by/mvc/tut.by.event.manager',
    'plugins/widgets/tut.by/mvc/tut.by.permission'
], function defineTutBy(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TutBy
     * @param containment
     * @param [opts]
     * @constructor
     * @class TutBy
     * @extends AntHill
     */
    var TutBy = function TutBy(containment, opts) {

        /**
         * Define containment
         * @property TutBy
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property TutBy
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
         * @property TutBy
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

    return TutBy.extend('TutBy', {}, AntHill.prototype);
});
