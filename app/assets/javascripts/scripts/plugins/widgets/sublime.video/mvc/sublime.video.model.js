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
], function defineSublimeVideoModel(BaseModel, WidgetContentModel) {

  /**
   * Define SublimeVideo model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SublimeVideoModel
   * @constructor
   */
  var SublimeVideoModel = function SublimeVideoModel() {

    /**
     * Define preferences
     * @memberOf SublimeVideoModel
     * @type {{
         *      sublimevideoEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      sublimevideoEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf SublimeVideoModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SublimeVideoModel.extend('SublimeVideoModel', {

    /**
     * Set SublimeVideo embed code
     * @memberOf SublimeVideoModel
     * @param {string} embed
     */
    setSublimevideoEmbedCode: function setSublimevideoEmbedCode(embed) {
      this.setPrefs('sublimevideoEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
