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
], function definePremiereTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define PremiereTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PremiereTvModel
     * @constructor
     */
    var PremiereTvModel = function PremiereTvModel() {

        /**
         * Define preferences
         * @member PremiereTvModel
         * @type {{
         *      premieretvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            premieretvEmbedCode: {
                type: 'textarea',
                disabled: true,
                value: '<object type="application/x-shockwave-flash" id="myDynamicContent" name="myDynamicContent" data="http://www.planeta-online.tv/planeta_player.swf?ver=102" width="692" height="384" style="display: block !important;"><param name="menu" value="true"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><param name="flashvars" value="f=ZHVyYXRpb249LTEmbG9nbz1odHRwOi8vd3d3LnBsYW5ldGEtb25saW5lLnR2L2ltYWdlcy9sb2dvL3ByLnBuZyZhZGZveD10cnVlJmNhdF9pZD0xNSZzdWJqZWN0PTQmcHVpZDY9MjAmYWdlPTQmeWVhcj05Jmdlbz0xJmNvZGU9MDA0MWEyNmY5NzhhNDM5M2E0M2NjNDlkYTVjZmJkNjQmZGw9d3d3LnBsYW5ldGEtb25saW5lLnR2JnJlZj13d3cucGxhbmV0YS1vbmxpbmUudHYmbGluaz1odHRwOi8vd3d3LnBsYW5ldGEtb25saW5lLnR2L2NoYW5uZWxzLzUuaHRtbCZvcGVuTGlua3M9X3NlbGYmdGl0bGU9JUQwJTlGJUQwJUEwJUQwJTk1JUQwJTlDJUQwJUFDJUQwJTk1JUQwJUEwJUQwJTkwLlRWJnJ0bXA9cnRtcDovLzgwLjkzLjUzLjg4OjE5MzUvbGl2ZS9jaGFubmVsXzU="></object>',
                visible: true
            }
        };

        /**
         * Define rules
         * @member PremiereTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PremiereTvModel.extend('PremiereTvModel', {

        /**
         * Set PremiereTv embed code
         * @member PremiereTvModel
         * @param {string} embed
         */
        setPremieretvEmbedCode: function setPremieretvEmbedCode(embed) {
            this.setPrefs('premieretvEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
