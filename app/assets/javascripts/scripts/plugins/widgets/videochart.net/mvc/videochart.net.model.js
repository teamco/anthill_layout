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
], function defineVideochartNetModel(BaseModel, WidgetContentModel) {

    /**
     * Define VideochartNet model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VideochartNetModel
     * @constructor
     */
    var VideochartNetModel = function VideochartNetModel() {

        /**
         * Define preferences
         * @property VideochartNetModel
         * @type {{
         *      videochartnetUrl: {type: string, disabled: boolean, value: string, visible: boolean}
         * }}
         */
        this.preferences = {
            videochartnetUrl: {
                type: 'textarea',
                disabled: false,
                value: 'http://videochart.net/video/38438.3439b8745c7875284034421dfba3',
                visible: true
            }
        };

        /**
         * Define rules
         * @property VideochartNetModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VideochartNetModel.extend('VideochartNetModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
