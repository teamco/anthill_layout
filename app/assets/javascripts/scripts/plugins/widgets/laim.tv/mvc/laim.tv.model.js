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
], function defineLaimTvModel(BaseModel, WidgetContentModel) {

  /**
   * Define LaimTv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class LaimTvModel
   * @constructor
   */
  var LaimTvModel = function LaimTvModel() {

    /**
     * Define preferences
     * @property LaimTvModel
     * @type {{}}
     */
    this.preferences = {
      laimtvEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: "<iframe src='http://www.laim.tv/video/7/' width='720' height='400' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>",
        visible: true
      }
    };

    /**
     * Define rules
     * @property LaimTvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return LaimTvModel.extend(
      'LaimTvModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
