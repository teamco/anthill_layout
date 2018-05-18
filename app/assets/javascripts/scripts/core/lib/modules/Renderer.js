/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/3/14
 * Time: 12:14 AM
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../extends/aggregation.js');

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

// 'modules/renderer/combo.box',
// 'modules/renderer/event.link',
// 'modules/renderer/iframe',
// 'modules/renderer/embed',
// 'modules/renderer/object',
// 'modules/renderer/filter',
// 'modules/renderer/comments',
// 'modules/renderer/label',
// 'modules/renderer/tabs',
// 'modules/renderer/fieldset',
// 'modules/renderer/slider',
// 'modules/renderer/text.editor',
// 'modules/renderer/text.area',
// 'modules/renderer/number.field'
// 'modules/renderer/upload.on.drop',
// 'modules/renderer/text.download',
// 'modules/renderer/validation',
// 'modules/renderer/range',
// 'modules/renderer/source',
// 'modules/renderer/list.box'

/**
 * @constant CheckBoxRenderer
 * @type {module.CheckBoxRenderer}
 */
const CheckBoxRenderer = require('./renderer/check.box.js');

/**
 * @constant FilterRenderer
 * @type {module.FilterRenderer}
 */
const FilterRenderer = require('./renderer/filter.js');

/**
 * @constant LabelRenderer
 * @type {module.LabelRenderer}
 */
const LabelRenderer = require('./renderer/label.js');

/**
 * @constant TabsRenderer
 * @type {module.TabsRenderer}
 */
const TabsRenderer = require('./renderer/tabs.js');

/**
 * @constant TextFieldRenderer
 * @type {module.TextFieldRenderer}
 */
const TextFieldRenderer = require('./renderer/text.field.js');

/**
 * @constant ToolTipRenderer
 * @type {module.ToolTipRenderer}
 */
const ToolTipRenderer = require('./renderer/tool.tip.js');

/**
 * @constant ValidationRenderer
 * @type {module.ValidationRenderer}
 */
const ValidationRenderer = require('./renderer/validation.js');

/**
 * Define renderer
 * @class Renderer
 * @type {module.Renderer}
 * @extends AntHill
 */
module.exports = class Renderer extends aggregation(AntHill, CheckBoxRenderer, FilterRenderer, LabelRenderer,
    TabsRenderer, TextFieldRenderer, ToolTipRenderer, ValidationRenderer) {

  /**
   * @constructor
   * @param {string} name
   */
  constructor(name) {
    super(name || 'Renderer', null, false);
  }

  /**
   * Define check visibility
   * @memberOf Renderer
   * @param $input
   * @param {boolean} visible
   */
  checkVisibility($input, visible) {
    if (!visible) $input.hide();
  }

  /**
   * Toggle disable
   * @memberOf Renderer
   * @param $input
   * @param {boolean} disabled
   */
  toggleDisableField($input, disabled) {
    $input.attr({disabled: disabled});
  }

  /**
   * Focus on field
   * @memberOf Renderer
   * @param {string} [element]
   */
  focusOn(element) {
    if (element) {
      $(element, this.$).focus();
    }
  }

  /**
   * Define monitor init
   * @memberOf Renderer
   * @param $input
   * @param monitor
   */
  initMonitor($input, monitor) {

    /**
     * Get controller
     * @type {BaseController}
     */
    const controller = this.view.controller;

    /**
     * Get validated callback
     * @param {function} fn
     * @returns {function|undefined}
     * @private
     */
    function _validateCallback(fn) {

      if (typeof fn === 'function') {
        return fn;
      }

      controller.scope.logger.warn('Undefined callback', fn, controller);
    }

    if (monitor && monitor.events) {

      /**
       * Get callback
       * @type {function|string}
       */
      let callback = monitor.callback;

      if (typeof callback === 'string' && _validateCallback(controller[callback])) {
        callback = controller[callback].bind(controller);
      }

      if (_validateCallback(callback)) {
        $input.on(monitor.events.join(' '), callback);
      }
    }
  }
};