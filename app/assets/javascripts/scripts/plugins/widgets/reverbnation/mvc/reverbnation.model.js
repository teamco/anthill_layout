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
], function defineReverbnationModel(BaseModel, WidgetContentModel) {

    /**
     * Define Reverbnation model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ReverbnationModel
     * @constructor
     */
    var ReverbnationModel = function ReverbnationModel() {

        /**
         * Define preferences
         * @property ReverbnationModel
         * @type {{reverbnationEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            reverbnationEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="100%" height="500" scrolling="no" frameborder="no" src="https://www.reverbnation.com/widget_code/html_widget/artist_4743601?widget_id=55&pwc[song_ids]=23522362&context_type=song&pwc[branded]=1" style="width:0px;min-width:100%;max-width:100%;"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property ReverbnationModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ReverbnationModel.extend('ReverbnationModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
