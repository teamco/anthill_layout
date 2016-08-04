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
], function defineAccuweatherVideosModel(BaseModel, WidgetContentModel) {

    /**
     * Define AccuweatherVideos model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AccuweatherVideosModel
     * @constructor
     */
    var AccuweatherVideosModel = function AccuweatherVideosModel() {

        /**
         * Define preferences
         * @property AccuweatherVideosModel
         * @type {{accuweathervideosEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            accuweathervideosEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<object id="flashObj" width="486" height="412" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,47,0"><param name="movie" value="http://c.brightcove.com/services/viewer/federated_f9?isVid=1" /><param name="bgcolor" value="#FFFFFF" /><param name="flashVars" value="videoId=1672071149&linkBaseURL=http%3A%2F%2Fvideowall.accuweather.com%2Fdetail%2Fvideos%2Ftrending-now%2Fvideo%2F1672071149%2Fstormy-from-mumbai-to-mandalay%3FautoStart%3Dtrue%26utm_source%3Daccuweather%26utm_medium%3Daccuweather%26utm_campaign%3Dlocalforecastvideo%26linkBaseURL%3Dhttp%253A%252F%252Fvideowall.accuweather.com%252Fdetail%252Fvideos%252Ftrending-now%252Fvideo%252F1672071149%252Fstormy-from-mumbai-to-mandalay%253FautoStart%253Dtrue%2526utm_source%253Daccuweather%2526utm_medium%253Daccuweather%2526utm_campaign%253Dlocalforecastvideo&playerID=16457168001&playerKey=AQ~~,AAAAAGAhaJE~,HI8awA-NQcWDsUX89UL9-sGtkJ0hq9Rm&domain=embed&dynamicStreaming=true" /><param name="base" value="http://admin.brightcove.com" /><param name="seamlesstabbing" value="false" /><param name="allowFullScreen" value="true" /><param name="swLiveConnect" value="true" /><param name="allowScriptAccess" value="always" /><embed src="http://c.brightcove.com/services/viewer/federated_f9?isVid=1" bgcolor="#FFFFFF" flashVars="videoId=1672071149&linkBaseURL=http%3A%2F%2Fvideowall.accuweather.com%2Fdetail%2Fvideos%2Ftrending-now%2Fvideo%2F1672071149%2Fstormy-from-mumbai-to-mandalay%3FautoStart%3Dtrue%26utm_source%3Daccuweather%26utm_medium%3Daccuweather%26utm_campaign%3Dlocalforecastvideo%26linkBaseURL%3Dhttp%253A%252F%252Fvideowall.accuweather.com%252Fdetail%252Fvideos%252Ftrending-now%252Fvideo%252F1672071149%252Fstormy-from-mumbai-to-mandalay%253FautoStart%253Dtrue%2526utm_source%253Daccuweather%2526utm_medium%253Daccuweather%2526utm_campaign%253Dlocalforecastvideo&playerID=16457168001&playerKey=AQ~~,AAAAAGAhaJE~,HI8awA-NQcWDsUX89UL9-sGtkJ0hq9Rm&domain=embed&dynamicStreaming=true" base="http://admin.brightcove.com" name="flashObj" width="486" height="412" seamlesstabbing="false" type="application/x-shockwave-flash" allowFullScreen="true" swLiveConnect="true" allowScriptAccess="always" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property AccuweatherVideosModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AccuweatherVideosModel.extend('AccuweatherVideosModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
