/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

module.exports = class BaseAPI extends AntHill {

  /**
   * Define Base API
   * @constructor
   * @class BaseAPI
   * @param {string} name
   */
  constructor(name) {
    super(name || 'BaseAPI');
  }

  /**
   * Create reference to function create [item] ...
   * @memberOf BaseAPI
   * @param args
   * @param {Boolean} render
   * @returns {*}
   */
  createItem(args, render) {
    this._executeReference(args, render, 'create');
  }

  /**
   * Create reference to function destroy [items] ...
   * @memberOf BaseAPI
   * @param {*} [items]
   * @param {Boolean} [silent]
   * @returns {*}
   */
  destroyItems(items, silent) {
    this._executeReference(items, silent, 'destroy', 's');
  }

  /**
   * Execute reference function
   * @memberOf BaseAPI
   * @param arg1
   * @param arg2
   * @param {String} prefix
   * @param {String} [suffix]
   * @private
   */
  _executeReference(arg1, arg2, prefix, suffix) {

    const scope = this.scope,
        cname = scope.model.item.name;

    const fn = prefix + cname + (suffix || '');

    scope.logger.debug(cname, fn, arguments);

    if (this[fn]) {
      return this[fn](arg1, arg2);
    }

    scope.logger.warn('Undefined method', fn);
  }

  /**
   * Create item API
   * @memberOf BaseAPI
   * @param {Function} item
   * @param {*} args
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @param {*} [where]
   * @returns {*}
   * @protected
   */
  _createItem(item, args, render, silent, where) {

    const scope = this.scope,
        cname = scope.model.getItemNameSpace();

    /**
     * Define silent
     * @type {Boolean}
     */
    scope.silent = this.base.defineBoolean(silent, false, true);

    if (this._isLimitReached()) {
      return false;
    }

    scope.observer.publish(
        scope.eventmanager.eventList['create' + scope.model.getItemName()],
        [args, scope.silent]
    );

    this._renderItem(item, render, silent, where);

    return scope[cname];
  }

  /**
   * Check if items limit was reached
   * @memberOf BaseAPI
   * @returns {boolean}
   * @private
   */
  _isLimitReached() {

    /**
     * Define scope local.
     * @type {*}
     */
    const scope = this.scope,
        cname = scope.model.getItemNameSpace(),
        itemConfig = scope.model.getConfig(cname);

    return scope.controller.checkCondition({
      condition: scope.model.getConfig('limit') &&
      itemConfig.count >= itemConfig.limit,
      type: 'warn',
      msg: this.i18n.t('reached.maximum.limit'),
      args: [cname, itemConfig]
    });
  }

  /**
   * Render item API
   * @memberOf BaseAPI
   * @param {Function} item
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @param {*} [where]
   * @returns {*}
   * @private
   */
  _renderItem(item, render, silent, where) {

    /**
     * Define scope
     * @type {*}
     */
    const scope = this.scope,
        itemScope = scope[scope.model.getItemNameSpace()];

    if (!itemScope.view) {
      scope.logger.warn('Item doesn\'t created');
      return false;
    }

    if (this.base.defineBoolean(render, false, true)) {
      itemScope.view.render(silent, where);
    }

    return itemScope;
  }
};