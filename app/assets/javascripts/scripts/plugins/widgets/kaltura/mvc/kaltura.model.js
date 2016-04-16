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
], function defineKalturaModel(BaseModel, WidgetContentModel) {

    /**
     * Define Kaltura model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class KalturaModel
     * @constructor
     */
    var KalturaModel = function KalturaModel() {

        /**
         * Define preferences
         * @property KalturaModel
         * @type {{
         *      kalturaEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            kalturaEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @property KalturaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return KalturaModel.extend('KalturaModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
