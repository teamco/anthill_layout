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
                value: '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0" width="550" height="412" type="application/x-shockwave-flash" id="video_player_1441629" class="viboom-overroll"><param name="id" value="video_player_1441629"/><param name="movie" value="http://www.yapfiles.ru/static/play.swf"/><param name="flashvars" value="st=vMDE0NDE2Mjktf5d4"/><param name="allowScriptAccess" value="always"/><param name="allowfullscreen" value="true"/><param name="wmode" value="transparent"/><param name="quality" value="high"/><embed src="http://www.yapfiles.ru/static/play.swf" flashvars="st=vMDE0NDE2Mjktf5d4" quality="high" allowscriptaccess="always" allowfullscreen="true" width="550" height="412" wmode="transparent" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash"/></object>',
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
