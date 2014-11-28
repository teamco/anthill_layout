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
], function defineHromadskeTvModel(BaseModel, WidgetContentModel) {

    /**
     * Define HromadskeTv model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class HromadskeTvModel
     * @constructor
     */
    var HromadskeTvModel = function HromadskeTvModel() {

        /**
         * Define preferences
         * @member HromadskeTvModel
         * @type {{
         *      hromadsketvUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            hromadsketvUrl: {
                type: 'text',
                value: 'https://www.youtube.com/watch?feature=player_embedded&v=RqbyYOCAFJU',
                disabled: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @member HromadskeTvModel
         * @type {{}}
         */
        this.rules = {};
    };

    return HromadskeTvModel.extend('HromadskeTvModel', {

        /**
         * Set HromadskeTv Url
         * @member HromadskeTvModel
         * @param {string} url
         */
        setHromadsketvUrl: function setHromadsketvUrl(url) {
            this.setPrefs('hromadsketvUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
