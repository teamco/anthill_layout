/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

import {BaseElement} from '../../modules/Element';

/**
 * Define Button Element
 * @class ButtonElement
 * @type {ButtonElement}
 * @extends BaseElement
 */
export class ButtonElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ButtonElement', view);
    this.setup(opts);
    this._config(view, opts, this.getTemplate(opts.$htmlElement)).build(opts);
    this.setContent();
    this.$.addClass('btn btn-' + this.type);
    this.disabled ? this.disable() : this.enable();
    return this;
  }

  /**
   * Get Button Template
   * @memberOf ButtonElement
   * @param $htmlElement
   * @returns {*}
   */
  getTemplate($htmlElement) {
    return $htmlElement ? $htmlElement : $('<button />');
  }

  /**
   * Define setup
   * @memberOf ButtonElement
   * @param opts
   */
  setup(opts) {

    /**
     * Define text
     * @memberOf ButtonElement
     */
    this.text = opts.text;

    /**
     * Define type
     * @type {string}
     */
    this.type = opts.type || 'default';
  }

  /**
   * Set content
   * @memberOf ButtonElement
   */
  setContent() {
    if (this.text) {
      this.setText(this.text);
      this.setTitle(this.text);
    }
  }

  /**
   * Define disable
   * @memberOf ButtonElement
   */
  disable() {

    this.$.addClass('disabled');

    /**
     * Define disabled
     * @memberOf ButtonElement
     */
    this.disabled = true;
  }

  /**
   * Define enable
   * @memberOf ButtonElement
   */
  enable() {

    this.$.removeClass('disabled');

    /**
     * Define disabled
     * @memberOf ButtonElement
     */
    this.disabled = false;
  }

  /**
   * Define after events callback
   * @memberOf ButtonElement
   * @param {n.Event} e
   */
  afterEventsCallback(e) {
    this.view.scope.logger.debug('After events callback', e);
  }
}
