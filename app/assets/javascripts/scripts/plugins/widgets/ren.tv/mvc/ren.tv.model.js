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
], function defineRenTvModel(BaseModel, WidgetContentModel) {

  /**
   * Define RenTv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class RenTvModel
   * @constructor
   */
  var RenTvModel = function RenTvModel() {

    /**
     * Define preferences
     * @property RenTvModel
     * @type {{rentvEmbedCode: {type: string, disabled: boolean, value: string,
     *     visible: boolean}}}
     */
    this.preferences = {
      rentvEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="http://ren.tv/player/112588" width="560" height="315" frameborder="0" allowfullscreen></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property RenTvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return RenTvModel.extend('RenTvModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
