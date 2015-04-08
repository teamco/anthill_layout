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
], function defineSomeEcardsModel(BaseModel, WidgetContentModel) {

    /**
     * Define SomeEcards model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SomeEcardsModel
     * @constructor
     */
    var SomeEcardsModel = function SomeEcardsModel() {

        /**
         * Define preferences
         * @memberOf SomeEcardsModel
         * @type {{
         *      someecardsEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            someecardsEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf SomeEcardsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SomeEcardsModel.extend('SomeEcardsModel', {

        /**
         * Set SomeEcards embed code
         * @memberOf SomeEcardsModel
         * @param {string} embed
         */
        setSomeecardsEmbedCode: function setSomeecardsEmbedCode(embed) {
            this.setPrefs('someecardsEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
