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
], function defineIftttModel(BaseModel, WidgetContentModel) {

  /**
   * Define Ifttt model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class IftttModel
   * @constructor
   */
  var IftttModel = function IftttModel() {

    /**
     * Define preferences
     * @property IftttModel
     * @type {{iftttEmbedCode: {type: string, disabled: boolean, value: string,
     *     visible: boolean}}}
     */
    this.preferences = {
      iftttEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<a href="https://ifttt.com/view_embed_recipe/189428-didn-t-sleep-much-last-night-remind-yourself-to-go-to-bed-early-tonight" target = "_blank" class="embed_recipe embed_recipe-l_73" id= "embed_recipe-189428"><img src= \'https://ifttt.com/recipe_embed_img/189428\' alt="IFTTT Recipe: Didn\'t sleep much last night? Remind yourself to go to bed early tonight! connects fitbit to google-calendar" width="370px" style="max-width:100%"/></a><script async type="text/javascript" src= "//ifttt.com/assets/embed_recipe.js"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property IftttModel
     * @type {{}}
     */
    this.rules = {};
  };

  return IftttModel.extend('IftttModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
