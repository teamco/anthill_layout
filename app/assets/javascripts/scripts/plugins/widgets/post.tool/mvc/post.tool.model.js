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
], function definePostToolModel(BaseModel, WidgetContentModel) {

    /**
     * Define PostTool model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PostToolModel
     * @constructor
     */
    var PostToolModel = function PostToolModel() {

        /**
         * Define preferences
         * @memberOf PostToolModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf PostToolModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PostToolModel.extend('PostToolModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});