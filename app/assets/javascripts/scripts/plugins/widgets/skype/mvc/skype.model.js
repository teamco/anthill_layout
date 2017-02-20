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
], function defineSkypeModel(BaseModel, WidgetContentModel) {

  /**
   * Define Skype model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SkypeModel
   * @constructor
   */
  var SkypeModel = function SkypeModel() {

    /**
     * Define preferences
     * @property SkypeModel
     * @type {{
         *      skypeBootstrap: {type: string, disabled: boolean, value:
         *     string, visible: boolean}, skypeApiKey: {type: string, disabled:
         *     boolean, value: string, visible: boolean}, skypeUiKey: {type:
         *     string, disabled: boolean, value: string, visible: boolean}
         * }}
     */
    this.preferences = {
      skypeBootstrap: {
        type: 'text',
        disabled: true,
        value: 'https://swx.cdn.skype.com/shared/v/1.2.15/SkypeBootstrap.min.js',
        visible: true
      },
      skypeApiKey: {
        type: 'text',
        disabled: false,
        value: 'a42fcebd-5b43-4b89-a065-74450fb91255',
        visible: true
      },
      skypeUiKey: {
        type: 'text',
        disabled: false,
        value: '9c967f6b-a846-4df2-b43d-5167e47d81e1',
        visible: true
      }
    };

    /**
     * Define rules
     * @property SkypeModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SkypeModel.extend(
      'SkypeModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
