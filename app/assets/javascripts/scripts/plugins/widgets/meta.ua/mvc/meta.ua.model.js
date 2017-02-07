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
], function defineMetaUaModel(BaseModel, WidgetContentModel) {

  /**
   * Define MetaUa model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class MetaUaModel
   * @constructor
   */
  var MetaUaModel = function MetaUaModel() {

    /**
     * Define preferences
     * @memberOf MetaUaModel
     * @type {{
         *      metaUrl: {type: string, disabled: boolean, value: undefined,
         *     visible: boolean}
         * }}
     */
    this.preferences = {
      metauaUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf MetaUaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return MetaUaModel.extend('MetaUaModel', {

    /**
     * Set MetaUa Url
     * @memberOf MetaUaModel
     * @param {string} url
     */
    setMetauaUrl: function setMetauaUrl(url) {
      this.setPrefs('metauaUrl', url);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
