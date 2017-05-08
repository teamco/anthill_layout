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
], function defineLearningAppsModel(BaseModel, WidgetContentModel) {

  /**
   * Define LearningApps model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class LearningAppsModel
   * @constructor
   */
  var LearningAppsModel = function LearningAppsModel() {

    /**
     * Define preferences
     * @property LearningAppsModel
     * @type {{learningappsEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      learningappsEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="//LearningApps.org/watch?app=1491499" style="border:0px;width:100%;height:500px" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property LearningAppsModel
     * @type {{}}
     */
    this.rules = {};
  };

  return LearningAppsModel.extend('LearningAppsModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
