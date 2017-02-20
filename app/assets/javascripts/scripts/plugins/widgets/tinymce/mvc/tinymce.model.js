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
], function defineTinymceModel(BaseModel, WidgetContentModel) {

  /**
   * Define Tinymce model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TinymceModel
   * @constructor
   */
  var TinymceModel = function TinymceModel() {

    /**
     * Define preferences
     * @property TinymceModel
     * @type {{
         *      tinymceContent: {type: string, disabled: boolean, value:
         *     string, visible: boolean}
         * }}
     */
    this.preferences = {
      tinymceContent: {
        type: 'texteditor',
        disabled: false,
        value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        visible: true
      }
    };

    /**
     * Define rules
     * @property TinymceModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TinymceModel.extend('TinymceModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
