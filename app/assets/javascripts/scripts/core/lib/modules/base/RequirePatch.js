/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
defineP(function defineLibRequirePatch() {

  /**
   * Define LibRequirePatch
   * @class LibRequirePatch
   * @constructor
   */
  var LibRequirePatch = function LibRequirePatch() {
  };

  LibRequirePatch.extend('LibRequirePatch', {

    /**
     * Get requirejs config
     * @memberOf LibRequirePatch
     * @returns {*}
     */
    get: function get() {
      return requirejs.s.contexts._.config;
    }
  });

  return new LibRequirePatch();
});