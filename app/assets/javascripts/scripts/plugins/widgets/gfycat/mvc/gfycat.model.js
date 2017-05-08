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
], function defineGfycatModel(BaseModel, WidgetContentModel) {

  /**
   * Define Gfycat model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class GfycatModel
   * @constructor
   */
  var GfycatModel = function GfycatModel() {

    /**
     * Define preferences
     * @property GfycatModel
     * @type {{gfycatUrl: {type: string, disabled: boolean, value: string,
     *     visible: boolean}}}
     */
    this.preferences = {
      gfycatUrl: {
        type: 'text',
        disabled: false,
        value: 'https://gfycat.com/SlimArcticGreatargus',
        visible: true
      }
    };

    /**
     * Define rules
     * @property GfycatModel
     * @type {{}}
     */
    this.rules = {};
  };

  return GfycatModel.extend('GfycatModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
