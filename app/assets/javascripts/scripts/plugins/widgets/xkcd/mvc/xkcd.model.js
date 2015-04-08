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
], function defineXkcdModel(BaseModel, WidgetContentModel) {

    /**
     * Define Xkcd model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class XkcdModel
     * @constructor
     */
    var XkcdModel = function XkcdModel() {

        /**
         * Define preferences
         * @memberOf XkcdModel
         * @type {{
         *      xkcdEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            xkcdEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf XkcdModel
         * @type {{}}
         */
        this.rules = {};
    };

    return XkcdModel.extend('XkcdModel', {

        /**
         * Set Xkcd embed code
         * @memberOf XkcdModel
         * @param {string} embed
         */
        setXkcdEmbedCode: function setXkcdEmbedCode(embed) {
            this.setPrefs('xkcdEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
