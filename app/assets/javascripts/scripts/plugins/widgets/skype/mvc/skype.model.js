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
], function defineSkypeModel(BaseModel, WidgetContentModel) {

    /**
     * Define Skype model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SkypeModel
     * @constructor
     */
    var SkypeModel = function SkypeModel() {

        /**
         * Define preferences
         * @property SkypeModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property SkypeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SkypeModel.extend('SkypeModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
