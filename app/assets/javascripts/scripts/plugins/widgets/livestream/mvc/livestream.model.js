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
], function defineLivestreamModel(BaseModel, WidgetContentModel) {

    /**
     * Define Livestream model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class LivestreamModel
     * @constructor
     */
    var LivestreamModel = function LivestreamModel() {

        /**
         * Define preferences
         * @member LivestreamModel
         * @type {{
         *      livestreamEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            livestreamEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member LivestreamModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LivestreamModel.extend('LivestreamModel', {

        /**
         * Set Livestream embed code
         * @member LivestreamModel
         * @param {string} embed
         */
        setLivestreamEmbedCode: function setLivestreamEmbedCode(embed) {
            this.setPrefs('livestreamEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
