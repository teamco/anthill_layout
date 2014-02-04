/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/translations/en-us'
], function definei18n(EnUs) {

    var langTypes = {
        'en-us': EnUs
    };

    /**
     * Define translations
     * @param {string} lang
     */
    var i18n = function i18n(lang) {

        /**
         * Define default
         * @type {string}
         */
        var defaultLanguage = 'en-us';

        /**
         * Define language
         * @type {string}
         */
        lang = anthill.base.define(lang, defaultLanguage);

        /**
         * Define data
         * @type {*}
         */
        var data = langTypes.hasOwnProperty(lang) ?
            langTypes[lang] :
            langTypes[defaultLanguage];

        /**
         * Get data by key
         * @param key
         * @returns {*}
         */
        this.getData = function getData(key) {
            return data.hasOwnProperty(key) ?
                data[key] : '';
        };
    };

    return i18n.extend({

        /**
         * Translate function
         * @param {string} key
         * @param {array} [params]
         * @returns {string}
         */
        t: function t(key, params) {
            var result = this.getData(key);
            if (typeof(params) === 'object') {
                for (var i = 0, l = params.length; i < l; i++) {
                    result = result.replace('{' + i + '}', params[i]);
                }
            }
            return result;
        }
    });

});