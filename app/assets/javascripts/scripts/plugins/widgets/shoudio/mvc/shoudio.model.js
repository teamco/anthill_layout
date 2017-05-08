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
], function defineShoudioModel(BaseModel, WidgetContentModel) {

  /**
   * Define Shoudio model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ShoudioModel
   * @constructor
   */
  var ShoudioModel = function ShoudioModel() {

    /**
     * Define preferences
     * @property ShoudioModel
     * @type {{}}
     */
    this.preferences = {
      shoudioEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="//s3.amazonaws.com/noise.shoudio.com/gadget/map.html?c=pop" style="width: 300px; height: 454px; background:transparent;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0" width="300" height="454"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property ShoudioModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ShoudioModel.extend('ShoudioModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
