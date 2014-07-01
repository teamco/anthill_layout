/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineOnlinefriendsModel(BaseModel) {

    /**
     * Define Onlinefriends model
     * @extends BaseModel
     * @class OnlinefriendsModel
     * @constructor
     */
    var OnlinefriendsModel = function OnlinefriendsModel() {

        /**
         * Define preferences
         * @member OnlinefriendsModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member OnlinefriendsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OnlinefriendsModel.extend('OnlinefriendsModel', {


    }, BaseModel.prototype);
});