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
], function defineMyWorldModel(BaseModel, WidgetContentModel) {

    /**
     * Define MyWorld model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MyWorldModel
     * @constructor
     */
    var MyWorldModel = function MyWorldModel() {

        /**
         * Define preferences
         * @memberOf MyWorldModel
         * @type {{
         *      myworldEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            myworldEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf MyWorldModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MyWorldModel.extend('MyWorldModel', {

        /**
         * Set MyWorld embed code
         * @memberOf MyWorldModel
         * @param {string} embed
         */
        setMyworldEmbedCode: function setMyworldEmbedCode(embed) {
            this.setPrefs('myworldEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
