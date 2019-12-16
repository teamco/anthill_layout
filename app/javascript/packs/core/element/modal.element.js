/**
 * Created view, with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseElement} from '../../modules/Element';

/**
 * Define Modal Element
 * @class ModalElement
 * @type {ModalElement}
 * @extends BaseElement
 */
export class ModalElement extends BaseElement {

  /**
   * @param {BaseView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('ModalElement', view);

    /**
     * Set button elements
     * @memberOf ModalElement
     */
    this.$buttons = {};

    this.setup(view, opts);

    this._config(view, opts, ModalElement.getTemplate()).build({
      $container: opts.$container || window.$('body')
    });

    this.initBootstrapModal();
  }

  /**
   * Setup modal dialog
   * @memberOf ModalElement
   * @param {BaseView} view
   * @param {{
   *  [style]: string,
   *  [cover]: boolean,
   *  [closeX]: boolean,
   *  [title]: string,
   *  [type]: string ('info', 'success', 'warning', 'danger'),
   *  [position]: string ('t(l-c-r), c(l-c-r), b(l-c-r)'),
   *  [adoptOnResize]: boolean,
   *  [html]: string,
   *  [text]: string,
   *  [hover]: boolean,
   *  [draggable]: boolean,
   *  [autoclose]: boolean,
   *  $container,
   *  [css],
   *  [items],
   *  [callbacks],
   *  [buttons]
   * }} opts
   */
  setup(view, opts) {

    // Define default container
    const $defaultContainer = window.$('body');

    /**
     * Set modal title
     * @property ModalElement
     * @type {string|*}
     */
    this.title = opts.title;

    /**
     * Set modal type ['danger', 'warning', 'success', 'info']
     * @property ModalElement
     * @type {string|*}
     */
    this.type = opts.type;

    /**
     * Set modal html
     * @property ModalElement
     * @type {string|*}
     */
    this.html = opts.html;

    /**
     * Set modal text
     * @property ModalElement
     * @type {string|*}
     */
    this.text = opts.text;

    /**
     * Set modal item dependency (called from)
     * @property ModalElement
     */
    this.items = opts.items;

    /**
     * Set modal style
     * @memberOf ModalElement
     * @type {string}
     */
    this.style = opts.style || '';

    /**
     * Set modal css
     * @property ModalElement
     * @type {$modal.css}
     */
    this.css = opts.css || {};

    /**
     * Set hover opacity
     * @property ModalElement
     * @type {*}
     */
    this.hover = view.utils.setBoolean(opts.hover, true);

    /**
     * Set modal parent container
     * @property ModalElement
     * @type {*|jQuery|HTMLElement}
     */
    this.$container = opts.$container || $defaultContainer;

    /**
     * Set modal position:
     *  ['tl' 'tc' 'tr']
     *  ['cl' 'cc' 'cr']
     *  ['bl' 'bc' 'br']
     * @property ModalElement
     * @type {string}
     */
    this.position = opts.position || 'cc';

    /**
     * Adopt position on resize
     * @property ModalElement
     * @type {boolean}
     */
    this.adoptOnResize = view.utils.setBoolean(opts.adoptOnResize, true);

    /**
     * Set modal is draggable condition
     * @property ModalElement
     * @type {*}
     */
    this.draggable = view.utils.setBoolean(opts.draggable, true);

    /**
     * Set close X button
     * @property ModalElement
     * @type {*}
     */
    this.closeX = view.utils.setBoolean(opts.closeX, true);

    /**
     * Set cover config
     * @property ModalElement
     * @type {*}
     */
    this.cover = view.utils.setBoolean(opts.cover, true);

    /**
     * Set close modal on click cover
     * @property ModalElement
     * @type {*}
     */
    this.autoclose = view.utils.setBoolean(opts.autoclose, false);

    /**
     * Set buttons config
     * @property ModalElement
     * @type {*|{}}
     */
    this.buttons = opts.buttons || {};

    /**
     * Set BS callbacks
     * @property ModalElement
     * @type {{[beforeHide], [afterHide], [beforeShow], [afterShow]}}
     */
    this.callbacks = opts.callbacks || {};
  }

  /**
   * Get template
   * @memberOf ModalElement
   * @static
   * @returns {*|jQuery|HTMLElement}
   */
  static getTemplate() {
    return `
      <div class="modal modal-notification fade" tabindex="-1" role="dialog" data-backdrop="true" aria-labelledby="modalLabel">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header alert">
              <h5 class="modal-title" id="modalLabel"></h5>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer separator"></div>
          </div>
        </div>
      </div>`;
  }

  /**
   * Render inner content
   * @memberOf ModalElement
   */
  initBootstrapModal() {

    /**
     * Get view
     * @type {BaseView}
     */
    const view = this.view;

    if (!this.$['modal']) {
      view.scope.logger.warn('Undefined modal');
      return false;
    }

    this.$['modal']();
    this.$.css(this.css);

    this.setModalType(this.type);
    this.setHeader();
    this.setText(this.text, this.get$Body());
    this.setHtml(this.html, this.get$Body());

    // this.setPosition({
    //   $container: this.$container,
    //   $item: this.$,
    //   position: this.position
    // });

    // this.adoptPositionOnResize();
    this.setButtons();
    this.setFocus();
    this.bindTabsScroll(this.$);

    if (this.draggable) {
      if (typeof this.$.draggable !== 'function') {
        if (view.controller.isConsumptionMode()) {
          return false;
        }

        view.scope.logger.warn('Unable to define draggable', this);
        return false;
      }

      this.$.draggable({handle: this._get$Header()});
    }

    for (let index in this.callbacks) {
      if (Object.prototype.hasOwnProperty.call(this.callbacks, index)) {
        if (typeof this[index] === 'function') {
          this[index](this.callbacks[index]);
        } else {
          this.view.scope.logger.warn('Unable to recognize callback', index);
        }
      }
    }
  }

  /**
   * Set focus
   * @memberOf ModalElement
   */
  setFocus() {
    if (this.html) {
      window.$('input:first', this.$).focus();
    }
  }

  /**
   * Adopt position on resize
   * @memberOf ModalElement
   */
  adoptPositionOnResize() {
    if (this.adoptOnResize) {

      /**
       * Get app event manager
       * @type {ApplicationEventManager|{subscribe, eventList}}
       */
      const appEventManager = this.view.controller.root().eventManager;

      appEventManager.subscribe({
        event: {name: appEventManager.eventList.resizeWindow},
        callback() {
          this.setPosition({
            $container: this.$container,
            $item: this.$,
            position: this.position
          });
        }
      }, false);
    }
  }

  /**
   * Set close X button
   * @memberOf ModalElement
   * @returns {boolean|undefined}
   * @private
   */
  _setCloseX() {
    if (!this.closeX) {
      return false;
    }

    this.buttons['closeX'] = {
      $container: this._get$Header().parent(),
      // language=HTML
      $htmlElement: window.$(`
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `),
      events: {click: 'rejectModalEvent'}
    };
  }

  /**
   * Set buttons
   * @memberOf ModalElement
   */
  setButtons() {
    const $container = this._get$Buttons();
    window.$.each(this.buttons, (i, button) => button.$container = $container);
    this._setCloseX();
    this.view.button(this.buttons, this.$buttons);
  }

  /**
   * Unset buttons
   * @memberOf ModalElement
   */
  unsetButtons() {
    window.$.each(this.$buttons, (i, $button) => $button.destroy());
  }

  /**
   * Set header
   * @memberOf ModalElement
   */
  setHeader() {
    const $header = this._get$Header();
    if (this.title) {
      $header.text(this.title).attr({title: this.title});
    } else {
      $header.hide();
    }
  }

  /**
   * Get HTML container
   * @memberOf ModalElement
   * @returns {*}
   */
  get$Body() {
    return this.$.find('div.modal-body');
  }

  /**
   * Get notification container
   * @memberOf ModalElement
   * @returns {*}
   * @public
   */
  _get$Notification() {
    return this.$.find('p.notification');
  }

  /**
   * Get buttons container
   * @memberOf ModalElement
   * @returns {*}
   * @private
   */
  _get$Buttons() {
    return this.$.find('.modal-footer');
  }

  /**
   * Get header container
   * @memberOf ModalElement
   * @returns {*}
   * @private
   */
  _get$Header() {
    return this.$.find('.modal-title');
  }

  /**
   * Self destroy functionality
   * @memberOf ModalElement
   * @param {boolean} [backdrop]
   */
  selfDestroy(backdrop) {
    this.unsetButtons();
    this.destroy();
    ModalElement.coverDestroy(0);
    if (this.utils.setBoolean(backdrop, true)) {
      window.$('body').removeClass('modal-open');
    }
  }

  /**
   * Cover destroy functionality
   * @memberOf ModalElement
   * @param {number} [index]
   * @static
   */
  static coverDestroy(index) {
    index = typeof index === 'undefined' ? 0 : index;
    const $covers = document.querySelectorAll('.modal-backdrop');
    $covers[index] && $covers[index].remove();
  }

  /**
   * Define modal type
   * @memberOf ModalElement
   * @param {string} type
   */
  setModalType(type) {
    type = type === 'error' ? 'danger' : type;
    this.$.find('.modal-header').addClass(`${this.style} alert-${type}`);
  }

  /**
   * Collect input fields (input/textarea)
   * @memberOf ModalElement
   * @param {{method: string, value: string}} [filter]
   * @returns {*|jQuery|HTMLElement}
   */
  collectInputFields(filter) {

    /**
     * Get inputs
     * @type {*|jQuery|HTMLElement|{filter}}
     */
    const $inputs = window.$('input:not(:disabled), textarea, .dropdown + input.store', this.$);

    /**
     * Get tinyMCE instance
     * @type {Window.tinymce|{get}}
     */
    const editorInstance = window.tinymce;

    if (editorInstance) {
      $inputs.filter('.editor').each(function() {

        /**
         * Get tinyMCE object data
         * @type {*}
         */
        const editor = editorInstance.get(this.id);

        if (editor) {
          window.$(this).val(editor.getContent());
        }
      });
    }

    if (filter) {
      return $inputs[filter.method](filter.value);
    }

    return $inputs;
  }

  /**
   * Define handle notifications
   * @memberOf ModalElement
   * @param {string} msg
   * @param {string} type
   */
  handleNotification(msg, type) {

    // Add successful message
    this.setText(msg, this._get$Notification().stop().show());

    // Handle modal type
    this.$.removeClass(this.type);
    this.$.addClass(type);

    setTimeout(() => {
      this._get$Notification().stop().slideUp(function() {
        window.$(this).text('').show();
      });
      this.$.removeClass(type);
      this.$.addClass(this.type);
    }, 4000);
  }

  /**
   * Define handle hide
   * @memberOf ModalElement
   * @param {function} [callback]
   */
  handleHide(callback) {
    this.$.on('hidden.bs.modal', e => {
      ModalElement.handleBSEvents(e, callback);
    });
  }

  /**
   * Define handle hide
   * @memberOf ModalElement
   * @param {function} [callback]
   */
  beforeHide(callback) {
    this.$.on('hide.bs.modal', e => {
      ModalElement.handleBSEvents(e, callback);
    });
  }

  /**
   * Define handle hidden
   * @memberOf ModalElement
   * @param {function} [callback]
   */
  afterHide(callback) {
    this.$.on('hidden.bs.modal', e => {
      ModalElement.handleBSEvents(e, callback);
    });
  }

  /**
   * Define handle show
   * @memberOf ModalElement
   * @param {function} [callback]
   */
  beforeShow(callback) {
    this.$.on('show.bs.modal', e => {
      ModalElement.handleBSEvents(e, callback);
    });
  }

  /**
   * Define handle shown
   * @memberOf ModalElement
   * @param {function} [callback]
   */
  afterShow(callback) {
    this.$.on('shown.bs.modal', e => {
      ModalElement.handleBSEvents(e, callback);
    });
  }

  /**
   * Define handle bootstrap events
   * @memberOf ModalElement
   * @param e
   * @param {function} [callback]
   * @static
   */
  static handleBSEvents(e, callback) {
    e.preventDefault();
    if (callback) {
      callback();
    }
  }
}