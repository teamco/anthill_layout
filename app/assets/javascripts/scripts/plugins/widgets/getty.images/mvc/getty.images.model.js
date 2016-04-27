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
], function defineGettyImagesModel(BaseModel, WidgetContentModel) {

    /**
     * Define GettyImages model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class GettyImagesModel
     * @constructor
     */
    var GettyImagesModel = function GettyImagesModel() {

        /**
         * Define preferences
         * @property GettyImagesModel
         * @type {{gettyimagesEmbedCode: {type: string, disabled: boolean, visible: boolean, value: string}}}
         */
        this.preferences = {
            gettyimagesEmbedCode: {
                type: 'textarea',
                disabled: false,
                visible: true,
                value: '<div class="getty embed image" style="background-color:#fff;display:inline-block;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:#a7a7a7;font-size:11px;width:100%;max-width:507px;"><div style="padding:0;margin:0;text-align:left;"><a href="http://www.gettyimages.com/detail/106047681" target="_blank" style="color:#a7a7a7;text-decoration:none;font-weight:normal !important;border:none;display:inline-block;">Embed from Getty Images</a></div><div style="overflow:hidden;position:relative;height:0;padding:66.666667% 0 0 0;width:100%;"><iframe src="//embed.gettyimages.com/embed/106047681?et=cDnIQ3_fR0J6tzGNrM9j0Q&viewMoreLink=off&sig=jjfIGQ4vw9XqgKqnYqbpkmAHk5JlC-0eWnfhK453uVg=" width="507" height="338" scrolling="no" frameborder="0" style="display:inline-block;position:absolute;top:0;left:0;width:100%;height:100%;margin:0;"></iframe></div><p style="margin:0;"></p></div>'
            }
        };

        /**
         * Define rules
         * @property GettyImagesModel
         * @type {{}}
         */
        this.rules = {};
    };

    return GettyImagesModel.extend('GettyImagesModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
