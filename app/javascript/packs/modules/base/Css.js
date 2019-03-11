/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * @class LibCss
 * @constructor
 */
export class LibCss {

  /**
   * Define reset matrix css
   * @memberOf LibCss
   * @static
   * @param $element
   */
  static resetMatrix($element) {
    $element.attr({
      style: $element.attr('style').
          replace(/matrix\(([+\-\d.]+), ([+\-\d.]+), ([+\-\d.]+), ([+\-\d.]+), ([+\-\d.]+), ([+\-\d.]+)\) /g, '')
    });
  }

  /**
   * Define element css
   * @memberOf LibCss
   * @param $element
   * @param {string} value
   * @param {string} type
   */
  defineCss(type, $element, value) {

    if (!$element[0]) {
      return false;
    }

    /**
     * Define update css
     * @private
     */
    function _updateCss(css) {

      // Define css
      let style = {};

      style[type] = css;
      style['-webkit-' + type] = css;

      $element.css(style);
    }

    let _f = $element[0].style[type],
        _wf = $element[0].style['webkit' + type.capitalize()];

    const _filter = _f.length ? _f : _wf.length ? _wf : 0;

    if (!_filter) {

      _updateCss(value);
      return false;
    }

    let _css = _filter.split(/ /g),
        _value = [], i = 0, l = _css.length,
        _updated = false;

    for (; i < l; i++) {
      let filter = _css[i];
      if (filter.indexOf(value.match(/\w+/)[0]) !== -1) {
        filter = value;
        _updated = true;
      }

      _value.push(filter);
    }

    if (!_updated) {
      _value.push(value);
    }

    _updateCss(_value.join(' '));
  }

  /**
   * @static
   * @memberOf LibCss
   * @param target
   * @param css
   */
  static toggle(target, css) {
    css = typeof css === 'string' ? css.split(' ') : css;
    for (let i in css) {
      target.classList.toggle(css[i]);
    }
  }
}