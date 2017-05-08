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
], function defineWistiaModel(BaseModel, WidgetContentModel) {

  /**
   * Define Wistia model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class WistiaModel
   * @constructor
   */
  var WistiaModel = function WistiaModel() {

    /**
     * Define preferences
     * @property WistiaModel
     * @type {{wistiaEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      wistiaEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<div><div style="width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;"><iframe src="//fast.wistia.net/embed/iframe/ahf6joh433" frameborder="0" allowfullscreen style="width: 100%; height: 100%; position: absolute;"></iframe></div></div>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property WistiaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return WistiaModel.extend('WistiaModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
