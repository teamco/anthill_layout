/**
 * Created with RubyMine.
 * User: teamco
 * Date: 10/9/13
 * Time: 12:59 PM
 */

define([
  'config/anthill'
], function defineMixin(AntHill) {

  var Mixin = function Mixin() {

  };

  return Mixin.extend('Mixin', {

    /**
     * Define default constants of instances
     */
    INSTANCES: [
      'Controller',
      'Model',
      'View',
      'EventManager',
      'Observer'
    ],

    /**
     * Get parent node object
     * @returns {*}
     */
    getParent: function getParent() {
      var parent = this.config.parent;

      if (!this.base.isDefined(parent)) {
        this.logger.debug('Instance has no property, parent');
      }

      return parent || this;
    },

    /**
     * Check if scope has parent node
     * @param [scope]
     * @returns {boolean}
     */
    hasParent: function hasParent(scope) {
      scope = scope || this;
      return scope.getParent() !== scope;
    },

    /**
     * Define getters
     */
    defineGetters: function defineGetters() {
      var proto = this.constructor.prototype;

      $.map(this.INSTANCES, function (index) {

        var instance = index.toLowerCase();
        if (this.hasOwnProperty(instance)) {
          proto['get' + index] = function defineSetter() {
            return this._getInstance(index);
          };
        }

        if (this.hasParent()) {
          var parent = this.getParent();
          if (parent.hasOwnProperty(instance)) {
            proto['getParent' + index] = function defineParentSetter() {
              return parent._getInstance(index);
            };
          }
        }

      }.bind(this));
    },

    /**
     * Get instance
     * @param {String} type
     * @returns {*}
     * @private
     */
    _getInstance: function _getInstance(type) {
      if (this._has(type.toLowerCase())) {
        return this[type.toLowerCase()];
      }
    },

    /**
     * Check if this has instance
     * @param {String} type
     * @returns {boolean}
     * @private
     */
    _has: function _has(type) {
      var isInstance = this.hasOwnProperty(type) &&
          this[type].name.toLowerCase() === type;

      if (!isInstance) {
        this.logger.warn('Instance has no controller');
      }

      return isInstance;
    }

  }, AntHill.prototype);
});