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
], function definePikTvModel(BaseModel, WidgetContentModel) {

  /**
   * Define PikTv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class PikTvModel
   * @constructor
   */
  var PikTvModel = function PikTvModel() {

    /**
     * Define preferences
     * @memberOf PikTvModel
     * @type {{
         *      piktvUrl: {type: string, disabled: boolean, value: undefined,
         *     visible: boolean}
         * }}
     */
    this.preferences = {
      piktvUrl: {
        type: 'text',
        disabled: true,
        value: 'http://pik-tv.com/online',
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf PikTvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return PikTvModel.extend('PikTvModel', {}, BaseModel.prototype,
      WidgetContentModel.prototype);
});
