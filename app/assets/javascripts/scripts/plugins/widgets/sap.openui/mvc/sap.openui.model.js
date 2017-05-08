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
], function defineSapOpenuiModel(BaseModel, WidgetContentModel) {

  /**
   * Define SapOpenui model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SapOpenuiModel
   * @constructor
   */
  var SapOpenuiModel = function SapOpenuiModel() {

    /**
     * Define preferences
     * @property SapOpenuiModel
     * @type {{}}
     */
    this.preferences = {
      // Preferences
    };

    /**
     * Define rules
     * @property SapOpenuiModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SapOpenuiModel.extend('SapOpenuiModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});