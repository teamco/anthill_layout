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
], function definePornhubModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pornhub model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PornhubModel
     * @constructor
     */
    var PornhubModel = function PornhubModel() {

        /**
         * Define preferences
         * @memberOf PornhubModel
         * @type {{pornhubUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}}}
         */
        this.preferences = {
            pornhubUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf PornhubModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PornhubModel.extend('PornhubModel', {

        /**
         * Set Pornhub Url
         * @memberOf PornhubModel
         * @param {string} url
         */
        setPornhubUrl: function setPornhubUrl(url) {
            this.setPrefs('pornhubUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
