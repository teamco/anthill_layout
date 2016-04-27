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
], function defineVerseModel(BaseModel, WidgetContentModel) {

    /**
     * Define Verse model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VerseModel
     * @constructor
     */
    var VerseModel = function VerseModel() {

        /**
         * Define preferences
         * @property VerseModel
         * @type {{verseEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            verseEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://verse.com/stories-embed/116-the-last-move/" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property VerseModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VerseModel.extend('VerseModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
