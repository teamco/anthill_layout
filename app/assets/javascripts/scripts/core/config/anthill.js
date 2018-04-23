/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/5/14
 * Time: 2:43 PM
 */

/**
 * @class AntHill
 */
module.exports = class AntHill {

  /**
   * @param {string} name
   * @param [scope]
   * @param {boolean} [isItemConstructor]
   * @constructor
   */
  constructor(name, scope, isItemConstructor) {

    /**
     * @constant Base
     * @type {Base}
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
    isItemConstructor = typeof  isItemConstructor === 'undefined' ? true : isItemConstructor;

    if (isItemConstructor) {

      /**
       * @constant Observer
       * @type {Observer}
       */
      const Observer = require('../lib/modules/Observer.js');

      /**
       * @constant Logger
       * @type {Logger}
       */
      const Logger = require('../lib/modules/Logger.js');

      /**
       * Init config
       * @property AntHill
       * @type {Object}
       */
      this.config = {};

      /**
       * Init observer
       * @property AntHill
       * @type {Observer}
       */
      this.observer = new Observer(this.scope || this);
      /**
       * Init logger
       * @property Anthill
       * @type {Logger}
       */
      this.logger = new Logger(this.scope || this);

      this.controller = undefined;
      this.model = undefined;
      this.eventManager = undefined;
      this.view = undefined;
    }

    /**
     * Init underscore.
     * @property AntHill
     * @type {Base|{setBoolean}}
     */
    this.utils = new Base();
  }
};