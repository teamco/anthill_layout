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
], function defineEspresoTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define EspresoTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EspresoTvModel
     * @constructor
     */
    var EspresoTvModel = function EspresoTvModel() {

        /**
         * Define preferences
         * @member EspresoTvModel
         * @type {{
         *      espresotvUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            espresotvUrl: {
                type: 'text',
                disabled: true,
                value: 'https://www.youtube.com/watch?feature=player_embedded&v=WQzVhOZnku8',
                visible: true
            }
        };

        /**
         * Define rules
         * @member EspresoTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EspresoTvModel.extend('EspresoTvModel', {

        /**
         * Set EspresoTv Url
         * @member EspresoTvModel
         * @param {string} url
         */
        setEspresotvUrl: function setEspresotvUrl(url) {
            this.setPrefs('espresotvUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
