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
], function defineAliezTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define AliezTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AliezTvModel
     * @constructor
     */
    var AliezTvModel = function AliezTvModel() {

        /**
         * Define preferences
         * @property AliezTvModel
         * @type {{
         *      alieztvEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            alieztvEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @property AliezTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AliezTvModel.extend(
        'AliezTvModel', {}, 
        BaseModel.prototype, 
        WidgetContentModel.prototype
    );
});
