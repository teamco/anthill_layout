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
], function defineInterludeModel(BaseModel, WidgetContentModel) {

  /**
   * Define Interlude model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class InterludeModel
   * @constructor
   */
  var InterludeModel = function InterludeModel() {

    /**
     * Define preferences
     * @property InterludeModel
     * @type {{}}
     */
    this.preferences = {
      interludeEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe width="854" height="480" src="https://v.interlude.fm/embed/V5PDXA?publisherID=hfUTkx" frameborder="0" allowfullscreen></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property InterludeModel
     * @type {{}}
     */
    this.rules = {};
  };

  return InterludeModel.extend(
      'InterludeModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
