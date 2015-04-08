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
], function defineVideoPayNetModel(BaseModel, WidgetContentModel) {

    /**
     * Define VideoPayNet model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VideoPayNetModel
     * @constructor
     */
    var VideoPayNetModel = function VideoPayNetModel() {

        /**
         * Define preferences
         * @memberOf VideoPayNetModel
         * @type {{
         *      videopaynetEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            videopaynetEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf VideoPayNetModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VideoPayNetModel.extend('VideoPayNetModel', {

        /**
         * Define setVideopaynetEmbedCode
         * @memberOf VideoPayNetModel
         * @param {string} code
         */
        setVideopaynetEmbedCode: function setVideopaynetEmbedCode(code) {
            this.setPrefs('videopaynetEmbedCode', code);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
