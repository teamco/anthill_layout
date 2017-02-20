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
], function defineTutByModel(BaseModel, WidgetContentModel) {

  /**
   * Define TutBy model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class TutByModel
   * @constructor
   */
  var TutByModel = function TutByModel() {

    /**
     * Define preferences
     * @property TutByModel
     * @type {{tutbyEmbedCode: {type: string, disabled: boolean, value: string,
     *     visible: boolean}}}
     */
    this.preferences = {
      tutbyEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<object type="application/x-shockwave-flash" data="http://www.tut.by/uppod/uppod.swf" width="547" height="360" id="player"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="movie" value="http://www.tut.by/uppod/uppod.swf" /><param name="FlashVars" value="m=video&amp;file=http://img.tyt.by/n/04/e/548x360_popytka_ogrableniya_lombarda_new_1.mp4&amp;id=http%3A%2F%2Fimg.tyt.by%2Fn%2F04%2Fe%2F548x360_popytka_ogrableniya_lombarda_new_1.mp4&amp;st=http://www.tut.by/uppod/frameid406/rek1/params.php?mode=swf&file=http://img.tyt.by/n/04/e/548x360_popytka_ogrableniya_lombarda_new_1.mp4&uid=swf1474627699378&free=1&amp;duration=0&amp;streamsend=sec&amp;auto=firstframe&amp;comment=o:&amp;debug=0&amp;poster=http://img.tyt.by/video_slides/n/04/e/548x360_popytka_ogrableniya_lombarda_new_1_vs_[1,2,3,4,5,6,7,8,9,10].jpg&amp;firstframe=2&amp;stream=1" /></object>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property TutByModel
     * @type {{}}
     */
    this.rules = {};
  };

  return TutByModel.extend(
      'TutByModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
