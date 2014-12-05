/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/keez.movies/mvc/keez.movies.controller',
    'plugins/widgets/keez.movies/mvc/keez.movies.model',
    'plugins/widgets/keez.movies/mvc/keez.movies.view',
    'plugins/widgets/keez.movies/mvc/keez.movies.event.manager',
    'plugins/widgets/keez.movies/mvc/keez.movies.permission'
], function defineKeezMovies(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define KeezMovies
     * @param containment
     * @param [opts]
     * @constructor
     * @class KeezMovies
     * @extends AntHill
     */
    var KeezMovies = function KeezMovies(containment, opts) {

        /**
         * Define containment
         * @member KeezMovies
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member KeezMovies
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
         * @member KeezMovies
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

    return KeezMovies.extend('KeezMovies', {

    }, AntHill.prototype);
});
