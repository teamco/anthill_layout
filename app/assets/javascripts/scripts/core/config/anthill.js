/**
 * Created with RubyMine.
 * User: i061485
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
         * Init API
         * @memberOf AntHill
         * @type {BaseAPI}
         */
        this.api = undefined;

        /**
         * Init observer
         * @memberOf AntHill
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @memberOf AntHill
         * @type {*}
         */
        this.eventmanager = undefined;

        /**
         * Define permissions
         * @memberOf AntHill
         * @type {BasePermission}
         */
        this.permission = undefined;

        /**
         * Init config
         * @memberOf AntHill
         * @type {Object}
         */
        this.config = {};

        /**
         * Init model
         * @memberOf AntHill
         * @type {BaseModel}
         */
        this.model = undefined;

        /**
         * Init view
         * @memberOf AntHill
         * @type {BaseView}
         */
        this.view = undefined;

        /**
         * Init controller
         * @memberOf AntHill
         * @type {BaseController}
         */
        this.controller = undefined;

        /**
         * Init logger
         * @type {Logger}
         */
        this.logger = undefined;
    };

    return AntHill.extend('AntHill', {

        /**
         * Define base
         * @memberOf AntHill
         * @type {Base}
         */
        base: new Base(),

        /**
         * Define translations
         * @type {i18n}
         */
        i18n: new i18n('en-us')
    });
});