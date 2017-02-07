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
], function defineArcgisModel(BaseModel, WidgetContentModel) {

  /**
   * Define Arcgis model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ArcgisModel
   * @constructor
   */
  var ArcgisModel = function ArcgisModel() {

    /**
     * Define preferences
     * @property ArcgisModel
     * @type {{
         *      arcgisEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      arcgisEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe frameborder="0" height="600" marginheight="0" marginwidth="0" scrolling="no" src="http://storymaps.esri.com/templates/swipe/" width="720"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property ArcgisModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ArcgisModel.extend(
      'ArcgisModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
