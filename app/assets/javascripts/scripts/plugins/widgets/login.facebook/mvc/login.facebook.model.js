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
], function defineLoginFacebookModel(BaseModel, WidgetContentModel) {

    /**
     * Define LoginFacebook model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class LoginFacebookModel
     * @constructor
     */
    var LoginFacebookModel = function LoginFacebookModel() {

        /**
         * Define preferences
         * @memberOf LoginFacebookModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf LoginFacebookModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LoginFacebookModel.extend('LoginFacebookModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});