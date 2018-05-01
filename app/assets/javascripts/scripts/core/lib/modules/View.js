/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

// 'element/modal.element',
// 'element/header.element',
// 'element/footer.element',
// 'element/filter.element'
/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * Define base view
 * @class BaseView
 * @extends AntHill
 */
module.exports = class BaseView extends AntHill {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseView', scope, false);

    /**
     * Define elements
     * @property BaseView
     * @type {Object}
     */
    this.elements = {};
  }

  /**
   * Define update elements items
   * @property BaseView
   * @param {BaseElement} [$item]
   * @param {string} [customId]
   */
  updateElementItems($item, customId) {

    if (!$item) {
      this.elements.items = this.elements.items || {};
      return false;
    }

    this.elements.items[customId ? customId : $item.id] = $item;
  }

  /**
   * Clean elements items
   * @property BaseView
   */
  cleanElementItems() {

    // clean content
    this.get$item().empty();

    delete this.elements.items;
  }

  /**
   * Get config HTML
   * @property BaseView
   * @param {string} [key]
   * @returns {*}
   */
  getConfigHTML(key) {

    /**
     * Define model
     * @type {BaseModel}
     */
    const model = this.scope.model;

    return key ? model.getConfig('html/' + key) :
        model.getConfig('html');
  }

  /**
   * Get item.$
   * @property BaseView
   * @returns {BaseElement}
   */
  get$item() {
    return this.elements['$' + this.scope.name.toLowerCase()];
  }

  /**
   * Get items $rules
   * @property BaseView
   * @returns {*}
   */
  get$rules() {
    return this.elements.$rules;
  }

  /**
   * Get items $preferences
   * @property BaseView
   * @returns {*}
   */
  get$get$preferences() {
    return this.elements.$preferences;
  }

  /**
   * Get item DOM Element
   * @property BaseView
   * @returns {BaseElement}
   */
  getDomElement() {
    return this.get$item().$[0];
  }

  /**
   * Get item DOM info
   * @property BaseView
   * @returns {ClientRect}
   */
  getDomData() {
    return this.getDomElement().getBoundingClientRect();
  }

  /**
   * Create style
   * @property BaseView
   * @returns {string}
   */
  createStyle() {
    return [
      this.getContainerClassName(),
      this.getConfigHTML('style')
    ].join(' ');
  }

  /**
   * Create UUID
   * @property BaseView
   * @returns {string}
   */
  createUUID() {
    return [
      this.scope.model.getUUID(),
      this.getContainerClassName()
    ].join('-');
  }

  /**
   * Render UUID
   * @property BaseView
   * @param id
   * @returns {*|string}
   */
  renderUUID(id) {
    return id || [
      this.base.lib.generator.UUID(),
      this.name.toDash()
    ].join('-');
  }

  /**
   * Define $container
   * @property BaseView
   * @param $container
   */
  defineContainer($container) {

    /**
     * Define container
     * @property BaseView.elements
     */
    this.elements.$container = $container;
  }

  /**
   * Get container class name
   * @property BaseView
   * @returns {string}
   */
  getContainerClassName() {
    return this.getConfigHTML().selector;
  }

  /**
   * Get container selector
   * @property BaseView
   * @returns {*|jQuery}
   */
  getContainerSelector() {
    const containment = this.scope.controller.getContainment();
    return containment.view.get$item().getElementContainer(
        containment.model.getItemNameSpace()
    );
  }

  /**§§§
   * Check if element cached
   * @property BaseView
   * @param $element
   * @param Constructor
   * @returns {boolean}
   */
  isCached($element, Constructor) {

    /**
     * Define cached element
     * @type {boolean}
     */
    const cached = this.elements[$element] instanceof Constructor;

    if (cached) {

      this.scope.logger.debug(
          this.i18n.t('element.already.rendered').
              replace(/\{0}/, Constructor.name)
      );
    }

    return cached;
  }

  /**
   * Check if render force
   * @property BaseView
   * @returns {boolean}
   */
  isCachedItems() {

    return this.base.lib.hash.hashLength(
        this.elements.items || {}
    ) > 0;
  }

  /**
   * Render Header
   * @property BaseView
   * @param {HeaderElement} HeaderElement
   * @param $container
   * @returns {HeaderElement}
   */
  header(HeaderElement, $container) {

    /**
     * Define $header
     * @property BaseView.elements
     * @type {HeaderElement}
     */
    this.elements.$header = new HeaderElement(this, {
      style: [
        this.scope.name.toDash(),
        'header'
      ].join('-'),
      $container: $container.$,
      append: false
    });

    /**
     * Define scope
     * @type {{}}
     */
    const scope = this.scope;

    scope.observer.publish(
        scope.eventManager.eventList.successRenderHeader, [
          this.elements.$header,
          this.getConfigHTML('header')
        ]
    );

    return this.elements.$header;
  }

  /**
   * Render Footer
   * @property BaseView
   * @param {FooterElement} FooterElement
   * @param $container
   * @returns {FooterElement}
   */
  footer(FooterElement, $container) {

    /**
     * Define $footer
     * @property BaseView.elements
     * @type {FooterElement}
     */
    this.elements.$footer = new FooterElement(this, {
      style: [
        this.scope.name.toDash(),
        'footer panel-footer'
      ].join('-'),
      $container: $container.$
    });

    /**
     * Define scope
     * @type {{}}
     */
    const scope = this.scope;

    scope.observer.publish(
        scope.eventManager.eventList.successRenderFooter, [
          this.elements.$footer,
          this.getConfigHTML('footer')
        ]
    );

    return this.elements.$footer;
  }

  /**
   * Render Header
   * @property BaseView
   * @param {HeaderElement} Header
   * @param {string} title
   */
  renderHeader(Header, title) {
    this.header(Header, this.get$container()).setText(title);
  }

  /**
   * Render Footer
   * @property BaseView
   * @param {FooterElement} Footer
   * @param {object} $element
   */
  renderFooter(Footer, $element) {
    this.footer(Footer, this.get$container()).setHtml(
        $element.getFooter()
    );
  }

  /**
   * Render filter
   * @property BaseView
   * @param {function} [callback]
   * @param {boolean} [enter]
   */
  renderFilter(callback, enter) {

    /**
     * Define Search element
     * @property BaseView.elements
     * @type {FilterElement}
     */
    this.elements.$filter = new Filter(this, {
      $container: this.get$container().$,
      style: [this.scope.name.toDash(), 'filter'].join(' '),
      callback: callback,
      enter: enter
    });
  }

  /**
   * Define get $container
   * @property BaseView
   * @returns {*}
   */
  get$get$container() {
    const $container = this.elements.$container;

    if (!$container) {

      this.scope.logger.error(
          'Unable to fetch $container',
          this.elements
      );

      return {};
    }

    return $container;
  }

  /**
   * Generic modal dialog window
   * @property BaseView
   * @param {{
   *      [style]: String,
   *      $container,
   *      [cover]: Boolean,
   *      [coverOpacity]: Number,
   *      [autoclose]: Boolean,
   *      [closeX]: Boolean,
   *      [css],
   *      [opacityOff]: Number,
   *      [opacityOn]: Number,
   *      [title]: String,
   *      [type]: String ('info', 'success', 'warning', 'danger'),
   *      [html]: *,
   *      [text]: String,
   *      [draggable]: Boolean,
   *      [items],
   *      [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
   *      [buttons]
   * }} opts
   */
  modalDialog(opts) {

    /**
     * Define $modal
     * @property BaseView.elements
     * @type {ModalElement}
     */
    this.elements.$modal = new ModalElement(this, {
      style: opts.style,
      $container: opts.$container,
      cover: opts.cover,
      coverOpacity: opts.coverOpacity,
      autoclose: opts.autoclose,
      closeX: opts.closeX,
      css: opts.css,
      opacityOff: opts.opacityOff,
      opacityOn: opts.opacityOn,
      title: opts.title,
      type: opts.type,
      html: opts.html,
      text: opts.text,
      draggable: opts.draggable,
      items: opts.items,
      position: opts.position,
      buttons: opts.buttons
    });
  }

  /**
   * Get $modal element
   * @property BaseView
   * @returns {ModalElement}
   */
  get$modal() {
    return this.elements.$modal;
  }

  /**
   * Generic button
   * @property BaseView
   * @param {Function|ButtonElement} ButtonElement
   * @param {{
   *    $container,
   *    [$htmlElement],
   *    style,
   *    text,
   *    type,
   *    disabled,
   *    events
   * }} opts
   * @param {*} store
   */
  button(ButtonElement, opts, store) {

    /**
     * Get BaseView
     * @type {BaseView}
     */
    const view = this;

    $.each(
        view.base.define(opts, {}, true),
        function _eachButton(i, button) {

          /**
           * Define button
           * @type {ButtonElement}
           */
          store[i] = new ButtonElement(view, {
            $container: button.$container,
            $htmlElement: button.$htmlElement,
            style: i.toDash(),
            type: button.type,
            text: button.text,
            disabled: button.disabled,
            events: button.events
          });

          $.each(button.events || {}, function _eachEvent(key, event) {
            store[i].$.on(
                key + '.afterCallback',
                store[i].afterEventsCallback.bind(store[i])
            );
          });

          view.scope.logger.debug(
              'Button created', store[i]
          );
        }
    );
  }

  /**
   * Define cover
   * @property BaseView
   * @param CoverElement
   * @param opts
   * @returns {CoverElement}
   */
  cover(CoverElement, opts) {
    return new CoverElement(this, {
      $container: opts.$container,
      style: opts.style,
      opacity: opts.opacity,
      events: opts.events
    });
  }

  /**
   * Locate DOM element in array
   * @property BaseView
   * @param {Array} source
   * @param {string} type
   * @returns {*}
   */
  locateDOMElement(source, type) {
    for (let i = 0, l = source.length; i < l; i++) {
      if ((source[i].tagName + '').toLowerCase() === type) {
        return source[i];
      }
    }
    return {};
  }

  /**
   * Update scroll cover
   * @property BaseView
   */
  updateScrollCover() {
    this.get$item().scrollCover(
        this.get$container().$
    );
  }
};