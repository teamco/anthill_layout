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
], function defineChannelTwoModel(BaseModel, WidgetContentModel) {

    /**
     * Define ChannelTwo model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ChannelTwoModel
     * @constructor
     */
    var ChannelTwoModel = function ChannelTwoModel() {

        /**
         * Define preferences
         * @member ChannelTwoModel
         * @type {{
         *      channeltwoEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            channeltwoEmbedCode: {
                type: 'textarea',
                disabled: true,
                value: '<object type="application/x-shockwave-flash" data="http://c.brightcove.com/services/viewer/federated_f9?&width=640&height=360&flashID=myExperience&bgcolor=%23FFFFFF&playerID=3199018807001&playerKey=AQ~~%2CAAABaSVvvhE~%2CkYID6H47O2uTO8qXOzApgwJhylV14cNn&isVid=true&isUI=true&dynamicStreaming=true&%40videoPlayer=besttv_live1&includeAPI=true&templateLoadHandler=myTemplateLoaded&templateReadyHandler=brightcove%5B%22templateReadyHandlermyExperience%22%5D&wmode=transparent&linkBaseURL=http%3A%2F%2Freshet.tv%2FShows%2FLive%2Fvideo%2F&autoStart=&debuggerID=&originalTemplateReadyHandler=onTemplateReady&startTime=1417686481926" id="myExperience" width="640" height="360" class="BrightcoveExperience" seamlesstabbing="undefined" style="display: block !important;"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="seamlessTabbing" value="false"><param name="swliveconnect" value="true"><param name="wmode" value="transparent"><param name="quality" value="high"><param name="bgcolor" value="#FFFFFF"></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @member ChannelTwoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ChannelTwoModel.extend('ChannelTwoModel', {

        /**
         * Set ChannelTwo embed code
         * @member ChannelTwoModel
         * @param {string} embed
         */
        setChanneltwoEmbedCode: function setChanneltwoEmbedCode(embed) {
            this.setPrefs('channeltwoEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
