/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineLogingglModel(BaseModel) {

    /**
     * Define Loginggl model
     * @extends BaseModel
     * @class LogingglModel
     * @constructor
     */
    var LogingglModel = function LogingglModel() {

        /**
         * Define preferences
         * @member LogingglModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member LogingglModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LogingglModel.extend('LogingglModel', {


    }, BaseModel.prototype);
});