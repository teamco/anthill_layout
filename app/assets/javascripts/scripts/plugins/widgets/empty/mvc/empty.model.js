/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineEmptyModel(BaseModel) {

    /**
     * Define Empty model
     * @extends BaseModel
     * @class EmptyModel
     * @constructor
     */
    var EmptyModel = function EmptyModel() {

        /**
         * Define preferences
         * @member EmptyModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member EmptyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EmptyModel.extend('EmptyModel', {


    }, BaseModel.prototype);
});