/**
 * Created by teamco on 10/30/14.
 */

/**
 * @class ValidationRenderer
 * @type {ValidationRenderer}
 */
export class ValidationRenderer {

  /**
   * Define validation
   * @param $input
   * @param opts
   */
  validateByMask($input, opts) {

    opts.validate = opts.validate || {};

    /**
     * Validate mask
     * @param value
     * @returns {opts.validate.mask|*|Array|{index: number, input: string}}
     * @private
     */
    function _checkMask(value) {

      /**
       * Get mask
       * @type {Array|RegExp|number}
       */
      let mask = opts.validate.mask,
          i = 0, match = [];

      if (!mask) return true;

      if (!Array.isArray(mask)) {
        mask = [mask];
      }

      for (i; i < mask.length; i++) {
        match.push(!!value.match(mask[i]));
      }

      return (new Function(['return ', match.join('||'), ';'].join('')))();
    }

    /**
     * Validate empty
     * @param value
     * @returns {boolean}
     * @private
     */
    function _checkEmpty(value) {
      if (!opts.validate.blank) {
        return true;
      }
      return opts.validate.blank ? true : !!$.trim(value).length;
    }

    /**
     * Add message container
     * @type {*|jQuery}
     */
    const $span = $('<span class="validate" />').text('The «' + opts.text + '» you entered is not valid');

    /**
     * Show error
     * @private
     */
    function _showError() {
      $input.addClass('validate');
      $input.after($span);
    }

    /**
     * Hide error
     * @private
     */
    function _hideError() {
      $input.removeClass('validate');
      $span.remove();
    }

    $input.focusout(function focusOut() {

      /**
       * Get value
       * @type {string}
       */
      const value = $input.val();

      _showError();

      if (_checkMask(value) && _checkEmpty(value)) _hideError();
    });
  }
}