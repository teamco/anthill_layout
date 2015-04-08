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
], function defineAOneHipHopModel(BaseModel, WidgetContentModel) {

    /**
     * Define AOneHipHop model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AOneHipHopModel
     * @constructor
     */
    var AOneHipHopModel = function AOneHipHopModel() {

        /**
         * Define preferences
         * @memberOf AOneHipHopModel
         * @type {{
         *      aonehiphopEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            aonehiphopEmbedCode: {
                type: 'textarea',
                disabled: true,
                value: '<object width="673" height="539" id="slon" data="http://www.aloha.cdnvideo.ru/aloha/slon/SlonPlayer_new.swf" type="application/x-shockwave-flash" style="display: block !important;"><param name="movie" value="http://www.aloha.cdnvideo.ru/aloha/slon/SlonPlayer_new.swf"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="flashvars" value="config={\'brand\':{\'colors\':{\'iconOver\':\'0xFFFFFF\',\'iconOut\':\'0xFF0000\'}},\'playlist\':{\'autoPlay\':\'false\',\'clip\':{\'live\':\'true\',\'progressLine\':\'false\',\'dynamic\':{\'switchMode\':\'change\',\'initialIndex\':\'0\',\'baseUrl\':\'rtmp://a1tv.cdnvideo.ru/a1tv\',\'bitrate\':{\'bitrateSpeed\':\'1500\',\'bitrateStream\':\'a1tv_hi\',\'bitrateName\':\'high\'},\'bitrate\':{\'bitrateSpeed\':\'1000\',\'bitrateStream\':\'a1tv_std\',\'bitrateName\':\'std\'} ,\'bitrate\':{\'bitrateSpeed\':\'500\',\'bitrateStream\':\'a1tv_lo\',\'bitrateName\':\'low\'}}}}};"></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf AOneHipHopModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AOneHipHopModel.extend('AOneHipHopModel', {

        /**
         * Set AOneHipHop embed code
         * @memberOf AOneHipHopModel
         * @param {string} embed
         */
        setAonehiphopEmbedCode: function setAonehiphopEmbedCode(embed) {
            this.setPrefs('aonehiphopEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
