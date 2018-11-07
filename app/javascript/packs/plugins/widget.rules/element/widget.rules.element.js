/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {PluginElement} from '../../plugin.element';
import {BaseRules} from '../../rules/widget/rules';

/**
 * @class WidgetRulesElement
 * @extends PluginElement
 */
export class WidgetRulesElement extends PluginElement {

  /**
   * @param {WidgetRulesView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetRulesElement', view, false);
    this._config(view, opts, $('<ul />')).build(opts);

    /**
     * @property WidgetRulesElement
     * @type {BaseRules}
     */
    this.rules = new BaseRules('BaseRules', this);
  }
}