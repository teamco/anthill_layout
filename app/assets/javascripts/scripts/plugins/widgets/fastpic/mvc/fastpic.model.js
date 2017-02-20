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
], function defineFastpicModel(BaseModel, WidgetContentModel) {

  /**
   * Define Fastpic model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FastpicModel
   * @constructor
   */
  var FastpicModel = function FastpicModel() {

    /**
     * Define preferences
     * @property FastpicModel
     * @type {{fastpicImageUrl: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      fastpicImageUrl: {
        type: 'textarea',
        disabled: false,
        value: 'http://i66.fastpic.ru/big/2015/0315/7f/2681ec8b88c4af3178ed8b59cb5a617f.jpeg',
        visible: true
      }
    };

    /**
     * Define rules
     * @property FastpicModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FastpicModel.extend(
      'FastpicModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
