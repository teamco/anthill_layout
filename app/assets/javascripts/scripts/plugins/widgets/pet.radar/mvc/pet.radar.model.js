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
], function definePetRadarModel(BaseModel, WidgetContentModel) {

  /**
   * Define PetRadar model
   * @extends BaseModel
   * @class PetRadarModel
   * @constructor
   */
  var PetRadarModel = function PetRadarModel() {

    /**
     * Define preferences
     * @memberOf PetRadarModel
     * @type {{}}
     */
    this.preferences = {};

    /**
     * Define rules
     * @memberOf PetRadarModel
     * @type {{}}
     */
    this.rules = {};
  };

  return PetRadarModel.extend('PetRadarModel', {}, BaseModel.prototype,
      WidgetContentModel.prototype);
});