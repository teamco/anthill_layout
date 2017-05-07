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
], function defineOdnoklassnikiModel(BaseModel, WidgetContentModel) {

  /**
   * Define Odnoklassniki model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class OdnoklassnikiModel
   * @constructor
   */
  var OdnoklassnikiModel = function OdnoklassnikiModel() {

    /**
     * Define preferences
     * @property OdnoklassnikiModel
     * @type {{
         *      odnoklassnikiGroupId: {type: string, disabled: boolean, value:
         *     string, visible: boolean}, odnoklassnikiWidth: {type: string,
         *     disabled: boolean, value: number, visible: boolean},
         *     odnoklassnikiHeight: {type: string, disabled: boolean, value:
         *     number, visible: boolean}
         * }}
     */
    this.preferences = {
      odnoklassnikiGroupId: {
        type: 'text',
        disabled: false,
        value: '50582132228315',
        visible: true
      },
      odnoklassnikiWidth: {
        type: 'number',
        disabled: false,
        value: 250,
        visible: true
      },
      odnoklassnikiHeight: {
        type: 'number',
        disabled: false,
        value: 225,
        visible: true
      }
    };

    /**
     * Define rules
     * @property OdnoklassnikiModel
     * @type {{}}
     */
    this.rules = {};
  };

  return OdnoklassnikiModel.extend(
      'OdnoklassnikiModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
