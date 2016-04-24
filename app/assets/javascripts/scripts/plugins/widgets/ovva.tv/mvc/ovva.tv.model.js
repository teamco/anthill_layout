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
], function defineOvvaTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define OvvaTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OvvaTvModel
     * @constructor
     */
    var OvvaTvModel = function OvvaTvModel() {

        /**
         * Define preferences
         * @property OvvaTvModel
         * @type {{}}
         */
        this.preferences = {
            ovvatvEmbedCode: {
                type: 'textarea',
                disabled: false,
                visible: true,
                value: '<iframe allowfullscreen tabindex="0" width="550" height="440" src="https://ovva.tv/video/embed/ftQAKZRA?autoplay=0&l=ua" frameborder="0"></iframe>'
            }
        };

        /**
         * Define rules
         * @property OvvaTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OvvaTvModel.extend(
        'OvvaTvModel', {}, 
        BaseModel.prototype, 
        WidgetContentModel.prototype
    );
});
