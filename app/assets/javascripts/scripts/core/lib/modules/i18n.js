/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/21/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

defineP(function defineI18n() {

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
     * @property i18n
     * @type {string}
     */
    this.language = lang || defaultLanguage;

    /**
     * Define language types
     * @type {Object}
     */
    var langTypes = {};

    var scope = this,
        data = langTypes[defaultLanguage],
        language = scope.getCurrentLanguage();

    requireP(
        ['modules/translations/' + language],
        function loadTranslations(translation) {

          langTypes[language] = translation;

          if (langTypes.hasOwnProperty(language)) {

            data = langTypes[language];

          } else {

            console.warn('Unable to defineP language', language);
          }
        }
    );

    /**
     * Get data by key
     * @property i18n
     * @param key
     * @returns {*}
     */
    this.getData = function getData(key) {

      if (_.isUndefined(data)) {
        console.warn('Undefined language', key);
        return '';
      }

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
     * Get current language
     * @memberOf i18n
     * @returns {string}
     */
    getCurrentLanguage: function getCurrentLanguage() {
      return this.language;
    },

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