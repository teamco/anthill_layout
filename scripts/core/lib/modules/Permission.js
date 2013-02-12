/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function definePermissionManager(Base) {
    var Permission = function Permission() {

    };

    return Permission.extend({
        check: function check(opts) {
            var base = this.base;

            opts = base.define(opts, {}, true);

            var might = this.scope.permission.getCapability(opts.might),
                callback = opts.callback,
                fallback = opts.fallback,
                args = base.define(opts.args, [], true);

            if (base.isFunction(callback)) {
                if (might) {
                    callback(args);
                } else if (base.isFunction(fallback)) {
                    fallback(args);
                }
            }
        },

        setCapability: function setCapability(key, value) {
            this.capability[key] = value;
            return this.getCapability(key);
        },

        getCapability: function getCapability(key) {
            return this.base.defineBoolean(this.capability[key], false, true);
        }

    }, Base);
});