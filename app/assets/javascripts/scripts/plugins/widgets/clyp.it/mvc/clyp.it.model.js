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
], function defineClypItModel(BaseModel, WidgetContentModel) {

  /**
   * Define ClypIt model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ClypItModel
   * @constructor
   */
  var ClypItModel = function ClypItModel() {

    /**
     * Define preferences
     * @property ClypItModel
     * @type {{clypitEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      clypitEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe width="100%" height="160" src="https://clyp.it/mehc1n22/widget" frameborder="0"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property ClypItModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ClypItModel.extend('ClypItModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
