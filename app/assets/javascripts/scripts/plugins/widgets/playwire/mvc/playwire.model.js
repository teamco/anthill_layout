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
], function definePlaywireModel(BaseModel, WidgetContentModel) {

  /**
   * Define Playwire model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class PlaywireModel
   * @constructor
   */
  var PlaywireModel = function PlaywireModel() {

    /**
     * Define preferences
     * @property PlaywireModel
     * @type {{playwireEmbedCode: {type: string, disabled: boolean, visible:
     *     boolean, value: string}}}
     */
    this.preferences = {
      playwireEmbedCode: {
        type: 'textarea',
        disabled: false,
        visible: true,
        value: '<script src="//cdn.playwire.com/bolt/js/zeus/embed.js" data-config="//config.playwire.com/1009112/videos/v2/4847203/zeus.json" data-width="100%" data-height="100%"  type="text/javascript" charset="utf-8"></script>'
      }
    };

    /**
     * Define rules
     * @property PlaywireModel
     * @type {{}}
     */
    this.rules = {};
  };

  return PlaywireModel.extend(
      'PlaywireModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
