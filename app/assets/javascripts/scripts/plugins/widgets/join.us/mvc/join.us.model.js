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
], function defineJoinUsModel(BaseModel, WidgetContentModel) {

    /**
     * Define JoinUs model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class JoinUsModel
     * @constructor
     */
    var JoinUsModel = function JoinUsModel() {

        /**
         * Define preferences
         * @property JoinUsModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property JoinUsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return JoinUsModel.extend('JoinUsModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
