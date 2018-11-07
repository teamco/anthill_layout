/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/5/14
 * Time: 2:43 PM
 */

import {Base} from '../../modules/Base';
import {Observer} from '../../modules/Observer';
import {Logger} from '../../modules/Logger';
import {i18n} from '../../modules/i18n';
import {MVC} from '../../modules/MVC';

/**
 * @class AntHill
 * @type {AntHill}
 */
export class AntHill {

  /**
   * @param {string} name
   * @param [scope]
   * @param {boolean} [isGeneral]
   * @constructor
   */
  constructor(name, scope, isGeneral) {

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

      /**
       * Init logger
       * @property Anthill
       * @type {i18n}
       */
      this.i18n = new i18n('en-us');

      this.api = undefined;
      this.controller = undefined;
      this.model = undefined;
      this.eventManager = undefined;
      this.view = undefined;
    }

    /**
     * Init utils.
     * @property AntHill
     * @type {Base|{setBoolean, waitFor}}
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
}