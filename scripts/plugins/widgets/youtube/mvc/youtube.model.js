/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model'
], function defineYoutubeModel(BaseModel) {

    /**
     * Define Youtube model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Define url
         * @type {string}
         */
        this.url = '//www.youtube.com/embed/6t6DKN0LGd4';
    };

    return Model.extend({

        /**
         * Get URL
         * @returns {string}
         */
        getUrl: function getUrl() {
            return this.url;
        },

        /**
         * Set URL
         * @param {string} url
         */
        setUrl: function setUrl(url) {

            /**
             * Define URL
             * @type {string}
             */
            this.url = url;
        }

    }, BaseModel.prototype);
});