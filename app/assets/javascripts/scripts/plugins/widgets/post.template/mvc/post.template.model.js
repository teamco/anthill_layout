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
], function definePostTemplateModel(BaseModel, WidgetContentModel) {

    /**
     * Define PostTemplate model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PostTemplateModel
     * @constructor
     */
    var PostTemplateModel = function PostTemplateModel() {

        /**
         * Define preferences
         * @memberOf PostTemplateModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf PostTemplateModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PostTemplateModel.extend('PostTemplateModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});