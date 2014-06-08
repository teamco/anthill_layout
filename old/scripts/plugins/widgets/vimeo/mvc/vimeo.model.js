/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineVimeoModel(BaseModel) {

    /**
     * Define Vimeo model
     * @extends BaseModel
     * @class VimeoModel
     * @constructor
     */
    var VimeoModel = function VimeoModel() {

        /**
         * Define preferences
         * @member VimeoModel
         * @type {{
         *      vimeoUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            vimeoUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member VimeoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VimeoModel.extend('VimeoModel', {

        /**
         * Set Vimeo Url
         * @member VimeoModel
         * @param {string} url
         */
        setVimeoUrl: function setVimeoUrl(url) {
            this.setPrefs('vimeoUrl', url);
        }

    }, BaseModel.prototype);
});