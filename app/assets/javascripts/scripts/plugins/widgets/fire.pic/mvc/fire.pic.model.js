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
], function defineFirePicModel(BaseModel, WidgetContentModel) {

    /**
     * Define FirePic model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FirePicModel
     * @constructor
     */
    var FirePicModel = function FirePicModel() {

        /**
         * Define preferences
         * @property FirePicModel
         * @type {{
         *      firepicUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            firepicUrl: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @property FirePicModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FirePicModel.extend('FirePicModel', {

        /**
         * Set FirePic embed code
         * @memberOf FirePicModel
         * @param {string} url
         */
        setFirepicUrl: function setFirepicUrl(url) {
            this.setPrefs('firepicUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
