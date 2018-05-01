/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/21/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Define translations
 * @class i18n
 */
module.exports = class i18n {

  /**
   * @constructor
   * @param {string} lang
   */
  constructor(lang) {

    /**
     * @property i18n
     * @type {string}
     */
    this.name = 'i18n';

    /**
     * Define default
     * @type {string}
     */
    const defaultLanguage = 'en-us';

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
    let langTypes = {};

    /**
     * Define language data
     * @property i18n
     * @type {*}
     */
    this.data = langTypes[defaultLanguage];

    let language = this.getCurrentLanguage();

    langTypes[language] = require('./translations/en-us.js');

    if (langTypes.hasOwnProperty(language)) {
      this.data = langTypes[language];
    } else {
      console.warn('Unable to define language', language);
    }
  }

  /**
   * @method getData
   * @param translation
   */
  updateData(translation) {
    for (let index in translation) {
      if (translation.hasOwnProperty(index)) {
        this.data[index] = translation[index];
      }
    }
  }

  /**
   * @method getData
   * @param key
   * @return {string}
   */
  getData(key) {
    if (!this.data) {
      console.warn('Undefined language', key);
      return '';
    }

    return this.data.hasOwnProperty(key) ? this.data[key] : '';
  }

  /**
   * Get current language
   * @property i18n
   * @returns {string}
   */
  getCurrentLanguage() {
    return this.language;
  }

  /**
   * Translate function
   * @property i18n
   * @param {string} key
   * @param {array} [params]
   * @returns {string}
   */
  t(key, params) {

    /**
     * Get data
     * @type {string|*}
     */
    let result = this.getData(key);

    if (typeof(params) === 'object') {
      for (let i = 0, l = params.length; i < l; i++) {
        result = result.replace(new RegExp('\\{' + i + '\\}'), params[i]);
      }
    }

    return result;
  }
};