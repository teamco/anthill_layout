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
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Init modules
         * @member Model
         * @type {Array}
         */
        this.modules = [];
    };

    return Model.extend({

        /**
         * Get list of modules
         * @member Model
         * @returns {*}
         */
        getModulesList: function getModulesList() {
            return this.scope.containment.model.getModule();
        }

    }, BaseModel.prototype);
});