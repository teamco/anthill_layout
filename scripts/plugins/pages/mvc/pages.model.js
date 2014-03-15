/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function definePagesModel(BaseModel) {

    /**
     * Define Pages model
     * @mixin BaseModel
     * @class Model
     * @constructor
     * @extends BaseModel
     */
    var Model = function Model() {

    };

    return Model.extend({

        /**
         * Get data provider
         * @member Model
         */
        getData: function getData(workspace) {
            return workspace.model.getItems();
        }

    }, BaseModel.prototype);
});