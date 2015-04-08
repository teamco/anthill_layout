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
], function defineEmptyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Empty model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EmptyModel
     * @constructor
     */
    var EmptyModel = function EmptyModel() {

        /**
         * Define preferences
         * @memberOf EmptyModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @memberOf EmptyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EmptyModel.extend('EmptyModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});