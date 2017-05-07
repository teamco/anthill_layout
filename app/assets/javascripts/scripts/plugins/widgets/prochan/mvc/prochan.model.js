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
], function defineProchanModel(BaseModel, WidgetContentModel) {

  /**
   * Define Prochan model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ProchanModel
   * @constructor
   */
  var ProchanModel = function ProchanModel() {

    /**
     * Define preferences
     * @property ProchanModel
     * @type {{prochanEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      prochanEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe width="640" height="360" src="http://www.prochan.com/embed?f=5a6_1465064752" frameborder="0" allowfullscreen></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property ProchanModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ProchanModel.extend('ProchanModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
