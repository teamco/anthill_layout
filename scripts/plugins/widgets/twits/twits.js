/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/mvc',
    'plugins/widgets/tweets/mvc/tweets.controller',
    'plugins/widgets/tweets/mvc/tweets.model',
    'plugins/widgets/tweets/mvc/tweets.view',
    'plugins/widgets/tweets/mvc/tweets.event.manager',
    'plugins/widgets/tweets/mvc/tweets.permission'
], function defineTweets(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Tweets
     * @param containment
     * @constructor
     * @class Tweets
     * @extends AntHill
     */
    var Tweets = function Tweets(containment) {

        /**
         * Define containment
         * @member Tweets
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member Tweets
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
         * Init observer
         * @member Tweets
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member Tweets
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member Tweets
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member Tweets
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member Tweets
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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
            this.eventmanager.eventList.initWidget
        );
    };

    return Tweets.extend('Tweets', {

    }, AntHill.prototype);
});