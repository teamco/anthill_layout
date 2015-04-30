/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/google.presentation/mvc/google.presentation.controller',
    'plugins/widgets/google.presentation/mvc/google.presentation.model',
    'plugins/widgets/google.presentation/mvc/google.presentation.view',
    'plugins/widgets/google.presentation/mvc/google.presentation.event.manager',
    'plugins/widgets/google.presentation/mvc/google.presentation.permission'
], function defineGooglePresentation(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define GooglePresentation
     * @param containment
     * @param [opts]
     * @constructor
     * @class GooglePresentation
     * @extends AntHill
     */
    var GooglePresentation = function GooglePresentation(containment, opts) {

        /**
         * Define containment
         * @memberOf GooglePresentation
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf GooglePresentation
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
         * @memberOf GooglePresentation
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

    return GooglePresentation.extend('GooglePresentation', {

    }, AntHill.prototype);
});
