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
], function defineDipityModel(BaseModel, WidgetContentModel) {

  /**
   * Define Dipity model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class DipityModel
   * @constructor
   */
  var DipityModel = function DipityModel() {

    /**
     * Define preferences
     * @property DipityModel
     * @type {{dipityEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      dipityEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<div class="dipity_embed" style="width:600px"><iframe width="600" height="400" src="http://www.dipity.com/StevePro/Steve-Jobs-Life-and-Career/?mode=embed&z=0#tl" style="border:1px solid #CCC;"></iframe><p style="margin:0;font-family:Arial,sans;font-size:13px;text-align:center"><a href="http://www.dipity.com/StevePro/Steve-Jobs-Life-and-Career/">Steve Job\'s Life and Career</a> on <a href="http://www.dipity.com/" />Dipity</a>.</p></div>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property DipityModel
     * @type {{}}
     */
    this.rules = {};
  };

  return DipityModel.extend('DipityModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
