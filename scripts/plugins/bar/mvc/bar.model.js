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
        getModulesList: function getModulesList() {
            return this.scope.containment.model.getModule();
        }

    }, BaseModel.prototype);
});