/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/19/12
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */
const caller = require('caller-id');

module.exports = class Logger {

  /**
   * Define Logger
   * @class LoggerJs
   * @extends AntHill
   * @constructor Logger
   */
  constructor(scope) {

    /**
     * Define scope
     * @property Logger
     * @type {*}
     */
    this.scope = scope;

    /**
     * @property Logger.utils
     * @type {Base}
     */
    this.utils = new (require('./Base.js'));

    this.setConfig(scope.config.logger || {});
  }

  /**
   * Set config
   * @memberOf LoggerJs
   * @param config
   */
  setConfig(config) {

    if (config) {

      /**
       * Define config
       * @type {*}
       */
      this.config = config;
    }

    this.defineLogs();
  }

  /**
   * Show Log
   * @memberOf LoggerJs
   * @returns {boolean}
   */
  showLog() {
    return this.config.show;
  }

  /**
   * Check if log available
   * @memberOf LoggerJs
   * @return {Boolean}
   */
  isLoggable() {
    return console && this.showLog();
  }

  /**
   * Puts (internal function)
   * @memberOf LoggerJs
   * @param {string} type
   * @returns {boolean}
   */
  puts(type) {

    const console = window.console,
        config = this.config,
        scope = this.scope,
        log = this.isLoggable();

    let content = [],
        hash = {};

    if (log && config.type[type]) {

      try {

        if (!!config.namespaces) {

          /**
           * Define constructor name instance
           * @type {Function.name|*}
           */
          const instance = scope.name;

          if (instance) {

            config.namespaces = config.namespaces || [config.namespaces];

            if ($.inArray(instance, config.namespaces) === -1) {
              return false;
            }
          }
        }

        let args = [], i = 1;

        for (i; i < arguments.length; i += 1) {
          args.push(arguments[i]);
        }

        if (console[type]) {

          hash[type] = args;
          content.push(hash);

        } else {

          content.push({log: args});
        }

        if (type === 'error' && console.trace) {
          content.push({trace: args});
        }

      } catch (e) {

        if (console.error) {
          content.push({
            error: [e, arguments]
          });
        }
      }
    }

    let i = 0;
    const l = content.length;

    if (!l) {
      return false;
    }

    console.groupCollapsed(scope);

    for (i; i < l; i += 1) {

      hash = content[i];

      const k = Object.keys(hash)[0];

      hash[k]['caller'] = caller.getData();
      hash[k]['line'] = this.stackIt(((new Error).stack + '').split('\n'));

      console[k](hash[k]);
    }

    console.info('timestamp', this.utils.ts.timestamp());
    console.groupEnd();

    return true;
  }

  /**
   * Stack trace parser
   * @memberOf LoggerJs
   * @param {Array} stacks
   * @returns {Array}
   */
  stackIt(stacks) {

    let log = [];

    for (let i = 1, l = stacks.length; i < l; i++) {
      log.push(stacks[i].replace(/^\s+at |\s+$/g, ''));
    }

    return log;
  }

  /**
   * Timer
   * @memberOf LoggerJs
   * @param {string} name
   * @param {boolean} start
   */
  timer(name, start) {

    const console = window.console,
        config = this.config,
        log = this.isLoggable();

    start = typeof start !== 'undefined';

    if (log && config.type.debug) {
      start ? console.time(name) : console.timeEnd(name);
    }
  }

  /**
   * Define available logs
   * @memberOf LoggerJs
   */
  defineLogs() {

    const availableLogs = Object.keys(this.config.type || {}),
        length = availableLogs.length;

    for (let i = 0; i < length; i += 1) {
      const log = availableLogs[i];

      if (log) {

        /**
         * Define logger types
         * @property Logger
         * @type {function}
         */
        this[log] = this.puts.bind(this, log);
      }
    }
  }
};
