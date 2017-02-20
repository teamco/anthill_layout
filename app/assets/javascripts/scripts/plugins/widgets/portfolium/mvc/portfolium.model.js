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
], function definePortfoliumModel(BaseModel, WidgetContentModel) {

  /**
   * Define Portfolium model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class PortfoliumModel
   * @constructor
   */
  var PortfoliumModel = function PortfoliumModel() {

    /**
     * Define preferences
     * @property PortfoliumModel
     * @type {{portfoliumEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      portfoliumEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<div class="portfolium-entry-widget" data-id="269480" data-width="300"></div><script src="https://portfolium.com/assets/js/portfolium.js" async></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property PortfoliumModel
     * @type {{}}
     */
    this.rules = {};
  };

  return PortfoliumModel.extend('PortfoliumModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
