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
], function defineRedTubeModel(BaseModel, WidgetContentModel) {

    /**
     * Define RedTube model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class RedTubeModel
     * @constructor
     */
    var RedTubeModel = function RedTubeModel() {

        /**
         * Define preferences
         * @memberOf RedTubeModel
         * @type {{redTubeUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}}}
         */
        this.preferences = {
            redTubeUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf RedTubeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return RedTubeModel.extend('RedTubeModel', {

        /**
         * Set RedTube Url
         * @memberOf RedTubeModel
         * @param {string} url
         */
        setRedTubeUrl: function setRedTubeUrl(url) {
            this.setPrefs('redTubeUrl', url);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
