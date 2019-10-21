/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class LibFunction
 * @type {LibFunction}
 */
export class LibFunction {

  /**
   * Define function creator
   * @memberOf LibFunction
   * @static
   * @param opts
   * @returns {Function}
   */
  static create(opts) {

    /**
     * Define function
     * @type {Function}
     */
    const fn = new Function(opts.params, opts.body);
    if (opts.scope) {

      // Add function to scope
      opts.scope[opts.name] = fn;
      return opts.scope[opts.name];
    }
    return fn;
  }
}

/**
 * @export
 * @param name
 * @param lib
 */
export const setGlobals = (name, lib) => {
  global[name] = lib;
  window[name] = lib;
};
