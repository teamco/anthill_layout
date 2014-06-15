/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineAvatarModel(BaseModel) {

    /**
     * Define Avatar model
     * @extends BaseModel
     * @class AvatarModel
     * @constructor
     */
    var AvatarModel = function AvatarModel() {

        /**
         * Define preferences
         * @member AvatarModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member AvatarModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AvatarModel.extend('AvatarModel', {


    }, BaseModel.prototype);
});