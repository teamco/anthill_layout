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
], function defineYapFilesModel(BaseModel, WidgetContentModel) {

    /**
     * Define YapFiles model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class YapFilesModel
     * @constructor
     */
    var YapFilesModel = function YapFilesModel() {

        /**
         * Define preferences
         * @memberOf YapFilesModel
         * @type {{
         *      yapfilesEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            yapfilesEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf YapFilesModel
         * @type {{}}
         */
        this.rules = {};
    };

    return YapFilesModel.extend('YapFilesModel', {

        /**
         * Set YapFiles embed code
         * @memberOf YapFilesModel
         * @param {string} embed
         */
        setYapfilesEmbedCode: function setYapfilesEmbedCode(embed) {
            this.setPrefs('yapfilesEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
