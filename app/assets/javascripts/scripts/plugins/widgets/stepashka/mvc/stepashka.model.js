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
], function defineStepashkaModel(BaseModel, WidgetContentModel) {

    /**
     * Define Stepashka model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class StepashkaModel
     * @constructor
     */
    var StepashkaModel = function StepashkaModel() {

        /**
         * Define preferences
         * @memberOf StepashkaModel
         * @type {{
         *      stepashkaEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            stepashkaEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf StepashkaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return StepashkaModel.extend('StepashkaModel', {

        /**
         * Set Stepashka embed code
         * @memberOf StepashkaModel
         * @param {string} embed
         */
        setStepashkaEmbedCode: function setStepashkaEmbedCode(embed) {
            this.setPrefs('stepashkaEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
