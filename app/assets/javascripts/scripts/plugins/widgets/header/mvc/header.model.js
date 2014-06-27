/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineHeaderModel(BaseModel) {

    /**
     * Define Header model
     * @extends BaseModel
     * @class HeaderModel
     * @constructor
     */
    var HeaderModel = function HeaderModel() {

        /**
         * Define preferences
         * @member HeaderModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member HeaderModel
         * @type {{}}
         */
        this.rules = {};
    };

    return HeaderModel.extend('HeaderModel', {


    }, BaseModel.prototype);
});