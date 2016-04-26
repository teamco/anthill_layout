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
], function defineSportliveModel(BaseModel, WidgetContentModel) {

    /**
     * Define Sportlive model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SportliveModel
     * @constructor
     */
    var SportliveModel = function SportliveModel() {

        /**
         * Define preferences
         * @property SportliveModel
         * @type {{
         *      sportliveEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}
         * }}
         */
        this.preferences = {
            sportliveEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="http://sportlive.ws/player?channel=match" width="643" height="360" frameborder="0" scrolling="no" allowfullscreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property SportliveModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SportliveModel.extend('SportliveModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
