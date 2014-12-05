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
], function defineTubeEightModel(BaseModel, WidgetContentModel) {

    /**
     * Define TubeEight model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class TubeEightModel
     * @constructor
     */
    var TubeEightModel = function TubeEightModel() {

        /**
         * Define preferences
         * @member TubeEightModel
         * @type {{
         *      tubeeightEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            tubeeightEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member TubeEightModel
         * @type {{}}
         */
        this.rules = {};
    };

    return TubeEightModel.extend('TubeEightModel', {

        /**
         * Set TubeEight embed code
         * @member TubeEightModel
         * @param {string} embed
         */
        setTubeeightEmbedCode: function setTubeeightEmbedCode(embed) {
            this.setPrefs('tubeeightEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
