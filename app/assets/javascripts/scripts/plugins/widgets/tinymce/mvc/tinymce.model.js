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
], function defineTinymceModel(BaseModel, WidgetContentModel) {

    /**
     * Define Tinymce model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TinymceModel
     * @constructor
     */
    var TinymceModel = function TinymceModel() {

        /**
         * Define preferences
         * @property TinymceModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property TinymceModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TinymceModel.extend('TinymceModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
