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
], function definePosttoolModel(BaseModel, WidgetContentModel) {

    /**
     * Define Posttool model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PosttoolModel
     * @constructor
     */
    var PosttoolModel = function PosttoolModel() {

        /**
         * Define preferences
         * @member PosttoolModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member PosttoolModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PosttoolModel.extend('PosttoolModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});