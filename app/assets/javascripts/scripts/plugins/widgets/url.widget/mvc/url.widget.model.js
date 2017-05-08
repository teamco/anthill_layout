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
], function defineUrlWidgetModel(BaseModel, WidgetContentModel) {

  /**
   * Define UrlWidget model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class UrlWidgetModel
   * @constructor
   */
  var UrlWidgetModel = function UrlWidgetModel() {

    /**
     * Define preferences
     * @property UrlWidgetModel
     * @type {{
         *      urlwidgetUrl: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}, urlwidgetShowInIframe: {type:
         *     string, disabled: boolean, value: undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      urlwidgetUrlResource: {
        type: 'textarea',
        disabled: false,
        value: 'http://www.w3schools.com',
        visible: true
      },
      urlwidgetShowInIframe: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        value: true,
        visible: true
      }
    };

    /**
     * Define rules
     * @property UrlWidgetModel
     * @type {{}}
     */
    this.rules = {};
  };

  return UrlWidgetModel.extend('UrlWidgetModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
