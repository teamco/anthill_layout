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
], function defineIceFloeModel(BaseModel, WidgetContentModel) {

  /**
   * Define IceFloe model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IceFloeModel
   * @constructor
   */
  var IceFloeModel = function IceFloeModel() {

    /**
     * Define preferences
     * @memberOf IceFloeModel
     * @type {{}}
     */
    this.preferences = {};

    /**
     * Define rules
     * @memberOf IceFloeModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IceFloeModel.extend('IceFloeModel', {}, BaseModel.prototype,
      WidgetContentModel.prototype);
});