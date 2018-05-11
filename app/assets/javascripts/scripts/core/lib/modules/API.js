/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * Define Base API
 * @class BaseAPI
 * @extends AntHill
 */
module.exports = class BaseAPI extends AntHill {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseAPI', scope, false);
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
   * @param {string} prefix
   * @param {string} [suffix]
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
   * @param {*} item
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
    scope.silent = this.utils.setBoolean(silent, false);

    if (this._isLimitReached()) {
      return false;
    }

    scope.observer.publish(
        scope.eventManager.eventList['create' + scope.model.getItemName()],
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

    if (scope.model.getConfig('limit') && itemConfig.count >= itemConfig.limit) {
      scope.logger.warn(this.i18n.t('reached.maximum.limit'), [cname, itemConfig]);
      return true;
    }
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

    if (itemScope.view) {
      this.utils.setBoolean(render, false) ?
          itemScope.view.render(silent, where) :
          itemScope.logger.warn('Item doesn\'t rendered');
    } else {
      scope.logger.warn('Item with no View', itemScope);
    }

    return itemScope;
  }
};