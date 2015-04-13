/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/translations/en-us'
], function defineI18n(EnUs) {

    /**
     * Define language types
     * @type {Object}
     */
    var langTypes = {
        'en-us': EnUs
    };

    /**
     * Define translations
     * @constructor
     * @class i18n
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
        lang = lang || defaultLanguage;

        /**
         * Define data
         * @type {*}
         */
        var data = langTypes.hasOwnProperty(lang) ?
            langTypes[lang] :
            langTypes[defaultLanguage];

        /**
         * Get data by key
         * @property i18n
         * @param key
         * @returns {*}
         */
        this.getData = function getData(key) {
            return data.hasOwnProperty(key) ?
                data[key] : '';
        };

        /**
         * Update data
         * @property i18n
         * @param translation
         */
        this.updateData = function updateData(translation) {

            var index;

            for (index in translation) {

                if (translation.hasOwnProperty(index)) {
                    data[index] = translation[index];
                }
            }
        };
    };

    return i18n.extend('i18n', {

        /**
         * Translate function
         * @memberOf i18n
         * @param {string} key
         * @param {array} [params]
         * @returns {string}
         */
        t: function t(key, params) {

            /**
             * Get data
             * @type {string|*}
             */
            var result = this.getData(key);

            if (typeof(params) === 'object') {
                for (var i = 0, l = params.length; i < l; i++) {
                    result = result.replace(
                        new RegExp('\\{' + i + '\\}'),
                        params[i]
                    );
                }
            }

            return result;
        }
    });
});