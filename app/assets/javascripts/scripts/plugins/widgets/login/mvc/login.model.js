/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineLoginModel(BaseModel) {

    /**
     * Define Login model
     * @extends BaseModel
     * @class LoginModel
     * @constructor
     */
    var LoginModel = function LoginModel() {

        /**
         * Define preferences
         * @member LoginModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member LoginModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LoginModel.extend('LoginModel', {


    }, BaseModel.prototype);
});