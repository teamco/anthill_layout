/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
  'config/anthill'
], function defineBaseAPI(AntHill) {

  /**
   * Define Base API
   * @constructor
   * @extends AntHill
   * @class BaseAPI
   */
  var BaseAPI = function BaseAPI() {

    /**
     * Define scope
     * @property BaseAPI
     * @type {undefined}
     */
    this.scope = undefined;
  };

  return BaseAPI.extend('BaseAPI', {

    /**
     * Create reference to function create [item] ...
     * @memberOf BaseAPI
     * @param args
     * @param {Boolean} render
     * @returns {*}
     */
    createItem: function createItem(args, render) {
      this._executeReference(args, render, 'create');
    },

    /**
     * Create reference to function destroy [items] ...
     * @memberOf BaseAPI
     * @param {*} [items]
     * @param {Boolean} [silent]
     * @returns {*}
     */
    destroyItems: function destroyItems(items, silent) {
      this._executeReference(items, silent, 'destroy', 's');
    },

    /**
     * Execute reference function
     * @memberOf BaseAPI
     * @param arg1
     * @param arg2
     * @param {String} prefix
     * @param {String} [suffix]
     * @private
     */
    _executeReference: function _executeReference(arg1, arg2, prefix, suffix) {

      var base = this.base,
          scope = this.scope,
          cname = scope.model.item.name;

      suffix = base.define(suffix, '', true);

      var fn = prefix + cname + suffix;

      scope.logger.debug(cname, fn, arguments);

      if (base.isFunction(this[fn])) {
        return this[fn](arg1, arg2);
      }

      scope.logger.warn('Undefined method', fn);
    },

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
    _createItem: function _createItem(item, args, render, silent, where) {

      var scope = this.scope,
          cname = scope.model.getItemNameSpace();

      /**
       * Define silent
       * @type {Boolean}
       */
      scope.silent = this.base.defineBoolean(silent, false, true);

      if (this._isLiimitReached()) {
        return false;
      }

      scope.observer.publish(
          scope.eventmanager.eventList['create' + scope.model.getItemName()],
          [args, scope.silent]
      );

      this._renderItem(item, render, silent, where);

      return scope[cname];
    },

    /**
     * Check if items limit was reached
     * @memberOf BaseAPI
     * @returns {boolean}
     * @private
     */
    _isLiimitReached: function _isLiimitReached() {

      /**
       * Define scope local.
       * @type {*}
       */
      var scope = this.scope,
          cname = scope.model.getItemNameSpace(),
          itemConfig = scope.model.getConfig(cname);

      return scope.controller.checkCondition({
        condition: scope.model.getConfig('limit') &&
        itemConfig.count >= itemConfig.limit,
        type: 'warn',
        msg: this.i18n.t('reached.maximum.limit'),
        args: [cname, itemConfig]
      });
    },

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
    _renderItem: function _renderItem(item, render, silent, where) {

      /**
       * Define scope
       * @type {*}
       */
      var scope = this.scope,
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

  }, AntHill.prototype);
});