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
         * @member AntHill
         * @type {BaseAPI}
         */
        this.api = undefined;

        /**
         * Init observer
         * @member AntHill
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member AntHill
         * @type {*}
         */
        this.eventmanager = undefined;

        /**
         * Define permissions
         * @member AntHill
         * @type {BasePermission}
         */
        this.permission = undefined;

        /**
         * Init config
         * @member AntHill
         * @type {Object}
         */
        this.config = {};

        /**
         * Init model
         * @member AntHill
         * @type {BaseModel}
         */
        this.model = undefined;

        /**
         * Init view
         * @member AntHill
         * @type {BaseView}
         */
        this.view = undefined;

        /**
         * Init controller
         * @member AntHill
         * @type {BaseController}
         */
        this.controller = undefined;
    };

    return AntHill.extend('AntHill', {

        /**
         * Define base
         * @member AntHill
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