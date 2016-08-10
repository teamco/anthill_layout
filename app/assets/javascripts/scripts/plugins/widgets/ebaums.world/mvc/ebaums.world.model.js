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
], function defineEbaumsWorldModel(BaseModel, WidgetContentModel) {

    /**
     * Define EbaumsWorld model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EbaumsWorldModel
     * @constructor
     */
    var EbaumsWorldModel = function EbaumsWorldModel() {

        /**
         * Define preferences
         * @property EbaumsWorldModel
         * @type {{}}
         */
        this.preferences = {
            ebaumsworldEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="http://www.ebaumsworld.com/media/embed/85100593" width="570" height="380" frameborder="0"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property EbaumsWorldModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EbaumsWorldModel.extend(
        'EbaumsWorldModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
