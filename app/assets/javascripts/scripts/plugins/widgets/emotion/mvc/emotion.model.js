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
], function defineEmotionModel(BaseModel, WidgetContentModel) {

    /**
     * Define Emotion model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EmotionModel
     * @constructor
     */
    var EmotionModel = function EmotionModel() {

        /**
         * Define preferences
         * @property EmotionModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property EmotionModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EmotionModel.extend('EmotionModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
