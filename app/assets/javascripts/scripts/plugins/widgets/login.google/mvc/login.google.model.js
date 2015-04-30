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
], function defineLoginGoogleModel(BaseModel, WidgetContentModel) {

    /**
     * Define LoginGoogle model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class LoginGoogleModel
     * @constructor
     */
    var LoginGoogleModel = function LoginGoogleModel() {

        /**
         * Define preferences
         * @memberOf LoginGoogleModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf LoginGoogleModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LoginGoogleModel.extend('LoginGoogleModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});