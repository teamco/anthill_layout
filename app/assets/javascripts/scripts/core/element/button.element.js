/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

/**
 * @constant BaseElement
 * @type {module.BaseElement}
 */
const BaseElement = require('../lib/modules/Element.js');

/**
 * Define Button Element
 * @class ButtonElement
 * @type {module.ButtonElement}
 * @extends BaseElement
 */
module.exports = class ButtonElement extends BaseElement {

  /**
   * @param view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ButtonElement', view, false);
    this.setup(opts);
    this._config(view, opts, this.getTemplate(opts.$htmlElement)).build(opts);
    this.setContent();
    this.$.addClass('btn btn-' + this.type);
    this.disabled ? this.disable() : this.enable();
    return this;
  }

  /**
   * Get Button Template
   * @property ButtonElement
   * @param $htmlElement
   * @returns {*}
   */
  getTemplate($htmlElement) {
    return $htmlElement ? $htmlElement : $('<button />');
  }

  /**
   * Define setup
   * @property ButtonElement
   * @param opts
   */
  setup(opts) {

    /**
     * Define text
     * @property ButtonElement
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
   * @property ButtonElement
   */
  setContent() {
    if (this.text) {
      this.setText(this.text);
    }
  }

  /**
   * Define disable
   * @property ButtonElement
   */
  disable() {

    this.$.addClass('disabled');

    /**
     * Define disabled
     * @property ButtonElement
     */
    this.disabled = true;
  }

  /**
   * Define enable
   * @property ButtonElement
   */
  enable() {

    this.$.removeClass('disabled');

    /**
     * Define disabled
     * @property ButtonElement
     */
    this.disabled = false;
  }

  /**
   * Define after events callback
   * @property ButtonElement
   * @param {n.Event} e
   */
  afterEventsCallback(e) {
    this.view.scope.logger.debug('After events callback', e);
  }
};
