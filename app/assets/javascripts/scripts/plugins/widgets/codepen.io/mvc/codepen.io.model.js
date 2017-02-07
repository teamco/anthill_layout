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
], function defineCodepenIoModel(BaseModel, WidgetContentModel) {

  /**
   * Define CodepenIo model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class CodepenIoModel
   * @constructor
   */
  var CodepenIoModel = function CodepenIoModel() {

    /**
     * Define preferences
     * @property CodepenIoModel
     * @type {{
         *      codepenioEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      codepenioEmbedCode: {
        type: 'text',
        disabled: false,
        value: '<p data-height="266" data-theme-id="0" data-slug-hash="wGjXGY" data-default-tab="js,result" data-user="towc" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/towc/pen/wGjXGY/">Neural Network visualization</a> by Matei Copot (<a href="http://codepen.io/towc">@towc</a>) on <a href="http://codepen.io">CodePen</a>.</p> <script async src="//assets.codepen.io/assets/embed/ei.js"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property CodepenIoModel
     * @type {{}}
     */
    this.rules = {};
  };

  return CodepenIoModel.extend(
      'CodepenIoModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
