/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/film.on/mvc/film.on.controller',
    'plugins/widgets/film.on/mvc/film.on.model',
    'plugins/widgets/film.on/mvc/film.on.view',
    'plugins/widgets/film.on/mvc/film.on.event.manager',
    'plugins/widgets/film.on/mvc/film.on.permission'
], function defineFilmOn(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FilmOn
     * @param containment
     * @param [opts]
     * @constructor
     * @class FilmOn
     * @extends AntHill
     */
    var FilmOn = function FilmOn(containment, opts) {

        /**
         * Define containment
         * @memberOf FilmOn
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf FilmOn
         * @type {*}
         */
        this.referrer = undefined;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      mask: string,
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
         *      }
         * }}
         */
        var DEFAULTS = {
            plugin: true,
            mask: '<iframe width="100%" height="100%" scrolling="no" src="http://www.filmon.com/tv/channel/export?channel_id={channel}" frameborder="0" allowfullscreen></iframe>',
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
         * @memberOf FilmOn
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

    return FilmOn.extend('FilmOn', {

    }, AntHill.prototype);
});
