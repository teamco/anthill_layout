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
], function definePornHostModel(BaseModel, WidgetContentModel) {

    /**
     * Define PornHost model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PornHostModel
     * @constructor
     */
    var PornHostModel = function PornHostModel() {

        /**
         * Define preferences
         * @memberOf PornHostModel
         * @type {{
         *      pornhostEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            pornhostEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PornHostModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PornHostModel.extend('PornHostModel', {

        /**
         * Set PornHost embed code
         * @memberOf PornHostModel
         * @param {string} embed
         */
        setPornhostEmbedCode: function setPornhostEmbedCode(embed) {
            this.setPrefs('pornhostEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
