/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineOnlineFriendsModel(BaseModel, WidgetContentModel) {

    /**
     * Define OnlineFriends model
     * @extends BaseModel
     * @class OnlineFriendsModel
     * @constructor
     */
    var OnlineFriendsModel = function OnlineFriendsModel() {

        /**
         * Define preferences
         * @member OnlineFriendsModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member OnlineFriendsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OnlineFriendsModel.extend('OnlineFriendsModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});