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
], function defineWikimapiaModel(BaseModel, WidgetContentModel) {

  /**
   * Define Wikimapia model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class WikimapiaModel
   * @constructor
   */
  var WikimapiaModel = function WikimapiaModel() {

    /**
     * Define preferences
     * @property WikimapiaModel
     * @type {{wikimapiaEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      wikimapiaEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="http://wikimapia.org/#lat=32.081229&lon=34.814043&z=15&l=&ifr=1&m=b" width="390" height="390" frameborder="0"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property WikimapiaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return WikimapiaModel.extend(
      'WikimapiaModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
