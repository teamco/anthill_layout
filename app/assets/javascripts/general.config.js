/**
 * Created by teamco on 18/04/2017.
 */

/**
 * General config.
 * @returns {{localStorage: _localStorage}}
 */
function config() {

  /**
   * Init local storage.
   * @param {string} storage
   * @param {string} content
   * @private
   */
  function _localStorage(storage, content) {
    window.localStorage[storage] = content;
    var script = document.getElementById('preload');
    script.parentNode.removeChild(script);
  }

  return {
    localStorage: _localStorage
  };
}