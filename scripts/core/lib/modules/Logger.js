/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/19/12
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base'
], function defineLog(Base) {

    var Logger = function Logger() {
//        this.LOGGER = this.base.lib.hash.hashKeys(
//            this.workspace.config.log.type
//        );
    };

    return Logger.extend({
        showLog: function showLog() {
            return this.base.isHashEmpty(this.self) ?
                true :
                this.workspace.config.log.show;
        },
        productionMode: function productionMode() {
            return this.base.isHashEmpty(this.self) ?
                false :
                this.workspace.config.log.mode === 'production';
        },
        puts: function puts(type) {
            var log = this.base.isDefined(window.console) &&
                ((!this.productionMode() &&
                    this.showLog()) ||
                    this.workspace.config.log.development);
            if (log && this.workspace.config.log.type[type]) {
                if (this.workspace.config.log.cover) {
                    window.console.info('>>> ' + type.toUpperCase() + ': Start');
                }
                try {
                    if (!!this.workspace.config.log.namespace) {
                        var instance = this.self.constructor.toString().match(/function (\w*)/);
                        if (this.base.isDefined(instance)) {
                            if (instance[1] !== this.workspace.config.log.namespace) {
                                return false;
                            }
                        }
                    }
                    var args = [this.self],
                        i;
                    for (i = 1; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }

                    if (this.base.isDefined(window.console[type])) {
                        window.console[type](args);
                    } else {
                        window.console.log(args);
                    }
                    if (type === 'error' && this.base.isDefined(window.console.trace)) {
                        window.console.trace();
                    }
                } catch(e) {
                    if (this.base.isDefined(window.console.error)) {
                        window.console.error(e, arguments);
                    }
                }
                if (this.workspace.config.log.cover && this.base.isDefined(window.console.info)) {
                    window.console.info('>>> /' + type.toUpperCase() + ': End');
                }
            }
            return true;
        },
        initLog: (function initLog() {
//            var logs = this.LOGGER,
//                length = logs.length,
//                i=0;
//            for (i; i < length; i++) {
//                if (this.base.isDefined(logs[i])) {
//                    this[logs[i]] = this.puts.bind(this, logs[i]);
//                }
//            }
        }.bind(this)())

    }, Base);
});