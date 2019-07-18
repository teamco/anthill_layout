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
       * @type {Observer|{batchPublish}}
       */
      this.observer = new Observer(scope || this);

      /**
       * Init logger
       * @property Anthill
       * @type {Logger}
       */
      this.logger = new Logger(scope || this);

      /**
       * Init logger
       * @property Anthill
       * @type {i18n}
       */
      this.i18n = new i18n('en-us');

      /**
       * @property Anthill
       * @type {BaseAPI}
       */
      this.api = undefined;

      /**
       * @property Anthill
       * @type {BaseController}
       */
      this.controller = undefined;

      /**
       * @property Anthill
       * @type {BaseModel}
       */
      this.model = undefined;

      /**
       * @property Anthill
       * @type {BaseEvent}
       */
      this.eventManager = undefined;

      /**
       * @property Anthill
       * @type {BaseView}
       */
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