/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function definePassportModel(BaseModel) {

    /**
     * Define Passport model
     * @extends BaseModel
     * @class PassportModel
     * @constructor
     */
    var PassportModel = function PassportModel() {

        /**
         * Define preferences
         * @member PassportModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member PassportModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PassportModel.extend('PassportModel', {


    }, BaseModel.prototype);
});