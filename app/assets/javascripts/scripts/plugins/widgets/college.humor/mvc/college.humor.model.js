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
], function defineCollegeHumorModel(BaseModel, WidgetContentModel) {

    /**
     * Define CollegeHumor model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class CollegeHumorModel
     * @constructor
     */
    var CollegeHumorModel = function CollegeHumorModel() {

        /**
         * Define preferences
         * @memberOf CollegeHumorModel
         * @type {{
         *      collegehumorEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            collegehumorEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf CollegeHumorModel
         * @type {{}}
         */
        this.rules = {};
    };

    return CollegeHumorModel.extend('CollegeHumorModel', {

        /**
         * Set CollegeHumor embed code
         * @memberOf CollegeHumorModel
         * @param {string} embed
         */
        setCollegehumorEmbedCode: function setCollegehumorEmbedCode(embed) {
            this.setPrefs('collegehumorEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
