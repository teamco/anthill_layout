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

    this._config(view, opts, this.getTemplate()).build({
      $container: opts.$container || $('body')
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
   *  [coverOpacity]: Number
   *  $container,
   *  [css],
   *  [items],
   *  [buttons]
   * }} opts
   */
  setup(view, opts) {

    // Define default container
    const $defaultContainer = $('body');

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
     * Set cover opacity
     * @property ModalElement
     * @type {Number|*}
     */
    this.coverOpacity = opts.coverOpacity;

    /**
     * Set buttons config
     * @property ModalElement
     * @type {*|{}}
     */
    this.buttons = opts.buttons || {};

    /**
     * Button elements
     * @type {*}
     */
    this.$buttons = undefined;
  }

  /**
   * Get template
   * @memberOf ModalElement
   * @returns {*|jQuery|HTMLElement}
   */
  getTemplate() {
    return $([
      '<div class="modal modal-notification" tabindex="-1" role="dialog" aria-labelledby="modalLabel">',
      '<div class="modal-dialog" role="document">',
      '<div class="modal-content">',
      '<div class="modal-header alert">',
      '<h4 class="modal-title" id="modalLabel"></h4></div>',
      '<div class="modal-body"></div>',
      '<div class="modal-footer separator">',
      '</div></div></div></div>'
    ].join(''));
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

    this.setPosition({
      $container: this.$container,
      $item: this.$,
      position: this.position
    });

    this.adoptPositionOnResize();
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

    if (this.autoclose) {
      $('.modal-backdrop.in').on('click.autoclose', view.controller.rejectModalEvent.bind(view));
    }
  }

  /**
   * Set focus
   * @memberOf ModalElement
   */
  setFocus() {
    if (this.html) {
      $('input:first', this.$).focus();
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
      $container: this._get$Header(),
      $htmlElement: $([
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">',
        '<span aria-hidden="true">&times;</span>',
        '</button>'].join('')),
      events: {click: 'rejectModalEvent'}
    };
  }

  /**
   * Set buttons
   * @memberOf ModalElement
   */
  setButtons() {
    const $container = this._get$Buttons();
    $.each(this.buttons, (i, button) => button.$container = $container);
    this._setCloseX();
    this.view.button(this.buttons, this.$buttons);
  }

  /**
   * Unset buttons
   * @memberOf ModalElement
   */
  unsetButtons() {
    $.each(this.$buttons, (i, $button) => $button.destroy());
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
    return this.$.find('h4');
  }

  /**
   * Self destroy functionality
   * @memberOf ModalElement
   * @param {boolean} [backdrop]
   */
  selfDestroy(backdrop) {
    this.unsetButtons();
    this.destroy();

    if (this.utils.setBoolean(backdrop, true)) {
      $('body').removeClass('modal-open');
      this.removeBackdrop();
    }
  }

  /**
   * Remove Bootstrap backdrop
   * @memberOf ModalElement
   */
  removeBackdrop() {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    if (document.querySelectorAll('.modal').length) {
      // TODO: Handled by previous modals
      if (backdrops.length) {
        backdrops[backdrops.length - 1].remove();
      }
    } else if (backdrops.length) {
      backdrops.forEach(backdrop => backdrop.remove());
    }
  }

  /**
   * Define modal type
   * @memberOf ModalElement
   * @param {string} type
   */
  setModalType(type) {
    this.$.find('.modal-header').addClass([this.style, 'alert-' + type].join(' '));
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
    const $inputs = $('input:not(:disabled), textarea, .dropdown + input.store', this.$);

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
          $(this).val(editor.getContent());
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
        $(this).text('').show();
      });
      this.$.removeClass(type);
      this.$.addClass(this.type);
    }, 4000);
  }
}