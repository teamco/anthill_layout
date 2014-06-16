/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model'
], function defineShareModel(BaseModel) {

    /**
     * Define Share model
     * @extends BaseModel
     * @class ShareModel
     * @constructor
     */
    var ShareModel = function ShareModel() {

        /**
         * Define preferences
         * @member ShareModel
         * @type {{}}
         */
        this.preferences = {
            shareFacebook: {
                type: 'checkbox',
                disabled: false,
                checked: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @member ShareModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ShareModel.extend('ShareModel', {

        setShareFacebook: function setShareFacebook(checked) {
            this.setPrefs('shareFacebook', checked);
        }

    }, BaseModel.prototype);
});