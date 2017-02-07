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
], function defineDocsComModel(BaseModel, WidgetContentModel) {

  /**
   * Define DocsCom model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class DocsComModel
   * @constructor
   */
  var DocsComModel = function DocsComModel() {

    /**
     * Define preferences
     * @property DocsComModel
     * @type {{docscomEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      docscomEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<div style="width: 608px; max-width: 100%; margin-bottom:5px;"><a href="https://docs.com/vladimir-tkach/b249675f-5a0c-4664-acc8-b1e26c7104bb/756004-dzone-rc-141-nodejs" title="756004-dzone-rc-141-nodejs" target="_blank" style="font-family: \'Segoe UI\'">756004-dzone-rc-141-nodejs</a><span style="font-family: \'Segoe UI Light\'">—</span><a href="https://docs.com/vladimir-tkach" target="_blank" style="font-family: \'Segoe UI\'">Vladimir Tkach</a><a style="float: right; margin-bottom:5px; font-family: \'Segoe UI\'" href="https://docs.com/vladimir-tkach/b249675f-5a0c-4664-acc8-b1e26c7104bb/756004-dzone-rc-141-nodejs" target="_blank">Docs.com</a></div><iframe src="https://docs.com/d/embed/D25194053-7545-6874-3970-000834222794%7eBd31a5882-7cc9-78ca-f232-8d2889b7e7b0" frameborder="0" scrolling="no" width="608px" height="407px" style="max-width:100%" allowfullscreen="False"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property DocsComModel
     * @type {{}}
     */
    this.rules = {};
  };

  return DocsComModel.extend(
      'DocsComModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
