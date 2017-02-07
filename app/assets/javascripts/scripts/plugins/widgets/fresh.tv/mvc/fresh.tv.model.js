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
], function defineFreshTvModel(BaseModel, WidgetContentModel) {

  /**
   * Define FreshTv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FreshTvModel
   * @constructor
   */
  var FreshTvModel = function FreshTvModel() {

    /**
     * Define preferences
     * @property FreshTvModel
     * @type {{
         *      freshtvEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      freshtvEmbedCode: {
        type: 'textarea',
        disabled: true,
        value: '<object type="application/x-shockwave-flash" id="myDynamicContent" name="myDynamicContent" data="http://www.planeta-online.tv/planeta_player.swf?ver=102" width="692" height="384" style="display: block !important;"><param name="menu" value="true"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="bgcolor" value="#000000"><param name="wmode" value="opaque"><param name="flashvars" value="f=ZHVyYXRpb249LTEmbG9nbz1odHRwOi8vd3d3LnBsYW5ldGEtb25saW5lLnR2Ly9pbWFnZXMvbG9nby9mcmVzaC5wbmcmYWRmb3g9dHJ1ZSZjYXRfaWQ9MTMmc3ViamVjdD01JnB1aWQ2PTc1JmFnZT00JnllYXI9OSZnZW89MSZjb2RlPTAwNDFhMjZmOTc4YTQzOTNhNDNjYzQ5ZGE1Y2ZiZDY0JmRsPXd3dy5wbGFuZXRhLW9ubGluZS50diZyZWY9d3d3LnBsYW5ldGEtb25saW5lLnR2Jmxpbms9aHR0cDovL3d3dy5wbGFuZXRhLW9ubGluZS50di9jaGFubmVscy80Lmh0bWwmb3BlbkxpbmtzPV9zZWxmJnRpdGxlPUZSRVNIVFYuVFYmcnRtcD1ydG1wOi8vODAuOTMuNTMuODg6MTkzNS9saXZlL2NoYW5uZWxfNA=="></object>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property FreshTvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FreshTvModel.extend('FreshTvModel', {

    /**
     * Set FreshTv embed code
     * @memberOf FreshTvModel
     * @param {string} embed
     */
    setFreshtvEmbedCode: function setFreshtvEmbedCode(embed) {
      this.setPrefs('freshtvEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
