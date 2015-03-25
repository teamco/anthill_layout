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
], function definePixivModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pixiv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PixivModel
     * @constructor
     */
    var PixivModel = function PixivModel() {

        /**
         * Define preferences
         * @member PixivModel
         * @type {{
         *      pixivEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            pixivEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member PixivModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PixivModel.extend('PixivModel', {

        /**
         * Set Pixiv embed code
         * @member PixivModel
         * @param {string} embed
         */
        setPixivEmbedCode: function setPixivEmbedCode(embed) {
            this.setPrefs('pixivEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
