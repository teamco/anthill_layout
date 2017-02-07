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
], function defineIframelyModel(BaseModel, WidgetContentModel) {

  /**
   * Define Iframely model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IframelyModel
   * @constructor
   */
  var IframelyModel = function IframelyModel() {

    /**
     * Define preferences
     * @property IframelyModel
     * @type {{
         *      iframelyApiKey: {type: string, disabled: boolean, value:
         *     string, visible: boolean}, iframelyUrl: {type: string, disabled:
         *     boolean, value: string, visible: boolean}
         * }}
     */
    this.preferences = {
      iframelyApiKey: {
        type: 'text',
        disabled: false,
        value: '5091335a2cdc457dcc7ad4',
        visible: true
      },
      iframelyUrl: {
        type: 'text',
        disabled: false,
        value: 'https://www.youtube.com/watch?v=cegdR0GiJl4',
        visible: true
      }
    };

    /**
     * Define rules
     * @property IframelyModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IframelyModel.extend(
      'IframelyModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
