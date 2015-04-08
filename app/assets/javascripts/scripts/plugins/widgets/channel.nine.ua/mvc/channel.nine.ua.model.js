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
], function defineChannelNineUaModel(BaseModel, WidgetContentModel) {

    /**
     * Define ChannelNineUa model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ChannelNineUaModel
     * @constructor
     */
    var ChannelNineUaModel = function ChannelNineUaModel() {

        /**
         * Define preferences
         * @memberOf ChannelNineUaModel
         * @type {{
         *      channelnineuaEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            channelnineuaEmbedCode: {
                type: 'text',
                disabled: true,
                value: 'http://edge.hitechstreaming.com/htsplayer/htsplayer.php?id=9tv',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf ChannelNineUaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ChannelNineUaModel.extend('ChannelNineUaModel', {

        /**
         * Set ChannelNineUa embed code
         * @memberOf ChannelNineUaModel
         * @param {string} embed
         */
        setChannelnineuaEmbedCode: function setChannelnineuaEmbedCode(embed) {
            this.setPrefs('channelnineuaEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
