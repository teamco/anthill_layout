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
    var Permission = function Permission(scope) {

    };

    return Permission.extend({
        check: function check(opts) {
            var base = this.base;

            opts = base.define(opts, {}, true);

            var might = base.defineBoolean(opts.might, false, true),
                callback = opts.callback,
                fallback = opts.fallback,
                args = base.define(opts.args, [], true);

            if (callback instanceof Function) {
                if (!might) {
                    callback(args);
                }
                else if (this.capability[might] === true) {
                    callback(args);
                }
                else if (fallback instanceof Function) {
                    fallback(args);
                }
            }
        }
    }, Base);
});