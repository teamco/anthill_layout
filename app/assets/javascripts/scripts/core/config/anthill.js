/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/5/14
 * Time: 2:43 PM
 */

define([
    'modules/Base',
    'modules/i18n'
], function defineAntHill(Base, i18n) {

    /**
     * Define AntHill
     * @class AntHill
     * @constructor
     */
    var AntHill = function AntHill() {

        /**
         * Init a new deferred object
         * @property AntHill
         * @type {object}
         */
        this.deferred = $.Deferred();

        /**
         * Init API
         * @property AntHill
         * @type {BaseAPI}
         */
        this.api = undefined;

        /**
         * Init observer
         * @property AntHill
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @property AntHill
         * @type {BaseEvent}
         */
        this.eventmanager = undefined;

        /**
         * Define permissions
         * @property AntHill
         * @type {BasePermission}
         */
        this.permission = undefined;

        /**
         * Init config
         * @property AntHill
         * @type {Object}
         */
        this.config = {};

        /**
         * Init model
         * @property AntHill
         * @type {BaseModel}
         */
        this.model = undefined;

        /**
         * Init view
         * @property AntHill
         * @type {BaseView}
         */
        this.view = undefined;

        /**
         * Init controller
         * @property AntHill
         * @type {BaseController}
         */
        this.controller = undefined;

        /**
         * Init logger
         * @property Anthill
         * @type {Logger}
         */
        this.logger = undefined;
    };

    return AntHill.extend('AntHill', {

        /**
         * Define base
         * @property AntHill
         * @type {Base}
         */
        base: new Base(),

        /**
         * Define translations
         * @property AntHill
         * @type {i18n}
         */
        i18n: new i18n('en-us')
    });
});