/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/19/12
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'modules/base'
], function defineLog($, Base) {

    var Logger = function Logger() {
    };

    return Logger.extend({
        showLog: function showLog() {
            return this.config.show;
        },
        developmentMode: function developmentMode() {
            return this.config.development;
        },
        puts: function puts(type) {
            var console = window.console,
                content = [],
                log = this.base.isDefined(console) &&
                    (this.developmentMode() && this.showLog());
            if (log && this.config.type[type]) {
                try {
                    if (!!this.config.namespaces) {
                        var instance = this.scope.getConstructorName();
                        if (this.base.isDefined(instance)) {
                            this.config.namespaces = this.base.define(
                                this.config.namespaces,
                                [this.config.namespaces],
                                true
                            )
                            if ($.inArray(instance, this.config.namespaces) === -1) {
                                return false;
                            }
                        }
                    }
                    var args = [], i = 0;
                    for (i; i < arguments.length; i += 1) {
                        args.push(arguments[i]);
                    }
                    args.splice(0, 1);

                    if (this.base.isDefined(console[type])) {
                        var hash = {};
                        hash[type] = args;
                        content.push(hash);
                    } else {
                        content.push({log: args});
                    }
                    if (type === 'error' && this.base.isDefined(console.trace)) {
                        content.push({trace: args});
                    }
                } catch (e) {
                    if (this.base.isDefined(console.error)) {
                        content.push({
                            error: [e, arguments]
                        });
                    }
                }
            }

            var i = 0, l = content.length;

            console.group(this.scope);
            for (i; i < l; i += 1) {
                var hash = content[i],
                    k = this.base.lib.hash.firstHashKey(hash);
                console[k](hash[k]);
            }
            console.info('timestamp', this.base.lib.datetime.timestamp());
            console.groupEnd();

            return true;
        },
        defineLogs: function defineLogs() {
            var availableLogs = this.base.lib.hash.hashKeys(
                    this.config.type
                ),
                length = availableLogs.length,
                i = 0;

            for (i; i < length; i += 1) {
                var log = availableLogs[i];
                if (this.base.isDefined(log)) {
                    this[log] = this.puts.bind(this, log);
                }
            }
        }

    }, Base);
});