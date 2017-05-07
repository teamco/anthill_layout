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
], function defineSwayModel(BaseModel, WidgetContentModel) {

  /**
   * Define Sway model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SwayModel
   * @constructor
   */
  var SwayModel = function SwayModel() {

    /**
     * Define preferences
     * @property SwayModel
     * @type {{swayEmbedCode: {type: string, disabled: boolean, value: string,
     *     visible: boolean}}}
     */
    this.preferences = {
      swayEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe width="760px" height="500px" src="https://sway.com/s/nLa7rrYhdCmzRyQd/embed" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property SwayModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SwayModel.extend('SwayModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
