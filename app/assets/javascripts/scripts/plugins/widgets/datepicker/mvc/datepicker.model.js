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
], function defineDatepickerModel(BaseModel, WidgetContentModel) {

  /**
   * Define Datepicker model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class DatepickerModel
   * @constructor
   */
  var DatepickerModel = function DatepickerModel() {

    /**
     * Define preferences
     * @memberOf DatepickerModel
     * @type {{
     *      datepickerShowWeek: {type: string, disabled: boolean, checked:
     *     boolean, visible: boolean, value: boolean}, datepickerFirstDay:
     *     {type: string, disabled: boolean, list: *[], value: string,
     *     visible: boolean}
     * }}
     */
    this.preferences = {
      datepickerFirstDay: {
        type: 'combobox',
        disabled: false,
        list: [
          {
            type: 'text',
            value: 'Sunday'
          },
          {
            type: 'text',
            value: 'Monday'
          }
        ],
        value: 'Sunday',
        visible: true
      },
      datepickerShowWeek: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true,
        value: true
      }
    };

    /**
     * Define rules
     * @memberOf DatepickerModel
     * @type {{}}
     */
    this.rules = {};
  };

  return DatepickerModel.extend('DatepickerModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
