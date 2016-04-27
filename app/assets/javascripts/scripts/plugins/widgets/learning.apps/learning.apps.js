/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/learning.apps/mvc/learning.apps.controller',
    'plugins/widgets/learning.apps/mvc/learning.apps.model',
    'plugins/widgets/learning.apps/mvc/learning.apps.view',
    'plugins/widgets/learning.apps/mvc/learning.apps.event.manager',
    'plugins/widgets/learning.apps/mvc/learning.apps.permission'
], function defineLearningApps(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define LearningApps
     * @param containment
     * @param [opts]
     * @constructor
     * @class LearningApps
     * @extends AntHill
     */
    var LearningApps = function LearningApps(containment, opts) {

        /**
         * Define containment
         * @property LearningApps
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property LearningApps
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
         * @property LearningApps
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

    return LearningApps.extend('LearningApps', {}, AntHill.prototype);
});
