/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/3/14
 * Time: 12:14 AM
 */

import {AntHill} from '../core/config/anthill';
import {CheckBoxRenderer} from './renderer/check.box';
import {DropDownRenderer} from './renderer/drop.down';
import {EventLinkRenderer} from './renderer/event.link';
import {FilterRenderer} from './renderer/filter';
import {FieldSetRenderer} from './renderer/fieldset';
import {LabelRenderer} from './renderer/label';
import {NumberFieldRenderer} from './renderer/number.field';
import {RangeRenderer} from './renderer/range';
import {SourceRenderer} from './renderer/source';
import {TextAreaRenderer} from './renderer/text.area';
import {TabsRenderer} from './renderer/tabs';
import {TextFieldRenderer} from './renderer/text.field';
import {TextEditorRenderer} from './renderer/text.editor';
import {ToolTipRenderer} from './renderer/tool.tip';
import {ValidationRenderer} from './renderer/validation';
import {ListBoxRenderer} from './renderer/list.box';
import {SelectRenderer} from './renderer/select';
import {aggregation} from '../lib/extends/aggregation';
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
 * Define renderer
 * @class Renderer
 * @type {Renderer}
 * @extends AntHill
 */
export class Renderer extends aggregation(AntHill, CheckBoxRenderer, DropDownRenderer, EventLinkRenderer,
    FilterRenderer, FieldSetRenderer, LabelRenderer, ListBoxRenderer, NumberFieldRenderer, RangeRenderer,
    SelectRenderer, SourceRenderer, TextAreaRenderer, TabsRenderer, TextEditorRenderer, TextFieldRenderer,
    ToolTipRenderer, ValidationRenderer) {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'Renderer', scope, false);
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
      window.$(element, this.$).focus();
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
}