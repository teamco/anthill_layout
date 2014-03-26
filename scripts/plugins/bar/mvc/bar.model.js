/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineBarModel(BaseModel) {

    /**
     * Define Bar model
     * @extends BaseModel
     * @class BarModel
     * @constructor
     */
    var BarModel = function BarModel() {

        /**
         * Init modules
         * @member BarModel
         * @type {Array}
         */
        this.modules = [];
    };

    return BarModel.extend('BarModel', {

        /**
         * Get list of modules
         * @member BarModel
         * @returns {*}
         */
        getModulesData: function getModulesData() {
            return this.scope.containment.model.getModule();
        },

        /**
         * Store modules
         * @member BarModel
         */
        storeModules: function storeModules() {
            this.modules = this.getModulesData();
        },

        /**
         * Get modules
         * @member BarModel
         * @returns {Array}
         */
        getModules: function getModules() {
            return this.modules;
        }

    }, BaseModel.prototype);
});