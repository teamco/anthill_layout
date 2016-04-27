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
], function defineOraTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define OraTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OraTvModel
     * @constructor
     */
    var OraTvModel = function OraTvModel() {

        /**
         * Define preferences
         * @property OraTvModel
         * @type {{oratvEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            oratvEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="640" height="360" src="//www.ora.tv/embed/0_5n38b3v5ggkw" frameBorder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property OraTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OraTvModel.extend('OraTvModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
