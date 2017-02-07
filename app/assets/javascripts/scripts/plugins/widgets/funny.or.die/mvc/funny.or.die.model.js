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
], function defineFunnyOrDieModel(BaseModel, WidgetContentModel) {

  /**
   * Define FunnyOrDie model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FunnyOrDieModel
   * @constructor
   */
  var FunnyOrDieModel = function FunnyOrDieModel() {

    /**
     * Define preferences
     * @property FunnyOrDieModel
     * @type {{
         *      funnyordieUrl: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      funnyordieUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @property FunnyOrDieModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FunnyOrDieModel.extend('FunnyOrDieModel', {

    /**
     * Set FunnyOrDie Url
     * @memberOf FunnyOrDieModel
     * @param {string} url
     */
    setFunnyordieUrl: function setFunnyordieUrl(url) {
      this.setPrefs('funnyordieUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
