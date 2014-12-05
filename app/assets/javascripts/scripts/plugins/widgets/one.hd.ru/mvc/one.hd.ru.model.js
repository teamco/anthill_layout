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
], function defineOneHdRuModel(BaseModel, WidgetContentModel) {

    /**
     * Define OneHdRu model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OneHdRuModel
     * @constructor
     */
    var OneHdRuModel = function OneHdRuModel() {

        /**
         * Define preferences
         * @member OneHdRuModel
         * @type {{
         *      onehdruEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            onehdruEmbedCode: {
                type: 'textarea',
                disabled: true,
                value: '<object type="application/x-shockwave-flash" data="http://1hd.ru/player/uppod-osmfhls.swf" width="888px" height="500px" id="videoplayer1529" style="visibility: visible; display: block !important;"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="id" value="videoplayer1529"><param name="flashvars" value="st=http://1hd.ru/player/style/video2-1936.txt&rtmpsess=0&rtmpconnect=0&file=rtmp://109.239.142.62/live/livestream3"></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @member OneHdRuModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OneHdRuModel.extend('OneHdRuModel', {

        /**
         * Set OneHdRu embed code
         * @member OneHdRuModel
         * @param {string} embed
         */
        setOnehdruEmbedCode: function setOnehdruEmbedCode(embed) {
            this.setPrefs('onehdruEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
