/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineIcefloeModel(BaseModel) {

    /**
     * Define Icefloe model
     * @extends BaseModel
     * @class IcefloeModel
     * @constructor
     */
    var IcefloeModel = function IcefloeModel() {

        /**
         * Define preferences
         * @member IcefloeModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member IcefloeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return IcefloeModel.extend('IcefloeModel', {


    }, BaseModel.prototype);
});