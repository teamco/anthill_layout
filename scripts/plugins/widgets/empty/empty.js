/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'modules/mvc',
    'plugins/widgets/empty/mvc/empty.controller',
    'plugins/widgets/empty/mvc/empty.model',
    'plugins/widgets/empty/mvc/empty.view',
    'plugins/widgets/empty/mvc/empty.event.manager',
    'plugins/widgets/empty/mvc/empty.permission'
], function defineBar(MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Empty
     * @param opts
     * @constructor
     * @class Empty
     */
    var Empty = function Empty(containment) {

        this.text = 'Ahlann ahlann ahlannn';

        /**
         * Define containment
         */
        this.containment = containment;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          width: {
         *              min: number,
         *              max: number
         *          },
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
         * Init observer
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @type {*}
         */
        this.config = undefined;

        /**
         * Define MVC
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [DEFAULTS],
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
            this.eventmanager.eventList.successCreated
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/bar/translations/en-us'] //TO DO ******************************
        );
    };

    return Empty.extend({

        getData: function getData() {
            return this.text;
        }

    });

});