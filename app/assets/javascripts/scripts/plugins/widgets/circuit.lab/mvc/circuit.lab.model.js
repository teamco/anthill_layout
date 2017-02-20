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
], function defineCircuitLabModel(BaseModel, WidgetContentModel) {

  /**
   * Define CircuitLab model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class CircuitLabModel
   * @constructor
   */
  var CircuitLabModel = function CircuitLabModel() {

    /**
     * Define preferences
     * @property CircuitLabModel
     * @type {{circuitlabHtmlCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      circuitlabHtmlCode: {
        type: 'textarea',
        disabled: false,
        value: '<a href="https://www.circuitlab.com/circuit/e38756/555-timer-as-astable-multivibrator-oscillator/"><img src="https://www.circuitlab.com/circuit/e38756/screenshot/540x405/"/></a>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property CircuitLabModel
     * @type {{}}
     */
    this.rules = {};
  };

  return CircuitLabModel.extend('CircuitLabModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
