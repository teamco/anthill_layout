/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/5/14
 * Time: 2:43 PM
 */

/**
 * @class AntHill
 * @type {module.AntHill}
 */
module.exports = class AntHill {

  /**
   * @param {string} name
   * @param [scope]
   * @param {boolean} [isGeneral]
   * @constructor
   */
  constructor(name, scope, isGeneral) {

    /**
     * @constant Base
     * @type {module.Base}
     */
    const Base = require('../lib/modules/Base.js');

    /**
     * Init scope name.
     * @property AntHill
     * @type {string}
     */
    this.name = name;

    if (scope) {

      /**
       * Init scope.
       */
      this.scope = scope;

    }

    /**
     * Reset instance
     * @type {boolean}
     */
    isGeneral = typeof  isGeneral === 'undefined' ? true : isGeneral;

    if (isGeneral) {

      /**
       * @constant Observer
       * @type {module.Observer}
       */
      const Observer = require('../lib/modules/Observer.js');

      /**
       * @constant Logger
       * @type {module.Logger}
       */
      const Logger = require('../lib/modules/Logger.js');

      /**
       * @constant i18n
       * @type {module.i18n}
       */
      const i18n = require('../lib/modules/i18n.js');

      /**
       * Init config
       * @property AntHill
       * @type {Object}
       */
      this.config = {};

      /**
       * Init observer
       * @property AntHill
       * @type {module.Observer}
       */
      this.observer = new Observer(this.scope || this);

      /**
       * Init logger
       * @property Anthill
       * @type {module.Logger}
       */
      this.logger = new Logger(this.scope || this);

      /**
       * Init logger
       * @property Anthill
       * @type {module.i18n}
       */
      this.i18n = new i18n('en-us');

      this.controller = undefined;
      this.model = undefined;
      this.eventManager = undefined;
      this.view = undefined;
    }

    /**
     * Init utils.
     * @property AntHill
     * @type {module.Base|{setBoolean}}
     */
    this.utils = new Base();
  }

  /**
   * @method lazyRender
   * @memberOf AntHill
   */
  lazyRender() {
    this.view ? this.view.render() : this.logger.warn('View should be defined');
  }
};