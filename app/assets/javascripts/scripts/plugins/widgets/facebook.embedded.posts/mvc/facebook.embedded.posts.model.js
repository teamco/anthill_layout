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
], function defineFacebookEmbeddedPostsModel(BaseModel, WidgetContentModel) {

    /**
     * Define FacebookEmbeddedPosts model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FacebookEmbeddedPostsModel
     * @constructor
     */
    var FacebookEmbeddedPostsModel = function FacebookEmbeddedPostsModel() {

        /**
         * Define preferences
         * @property FacebookEmbeddedPostsModel
         * @type {{}}
         */
        this.preferences = {
            facebookembeddedpostsEmbedCode: {
                type: 'textarea',
                disabled: false,
                visible: true,
                value: '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Filand.tv%2Fvideos%2F1579335622377342%2F&show_text=0&width=560" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>'
            }
        };

        /**
         * Define rules
         * @property FacebookEmbeddedPostsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FacebookEmbeddedPostsModel.extend(
        'FacebookEmbeddedPostsModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
