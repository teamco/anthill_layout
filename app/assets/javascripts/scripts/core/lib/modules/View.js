/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
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
     * @memberOf BaseView
     * @type {Object}
     */
    this.elements = {};
  }

  /**
   * Define update elements items
   * @memberOf BaseView
   * @param [$item]
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
   * @memberOf BaseView
   */
  cleanElementItems() {

    // clean content
    this.get$item().empty();

    delete this.elements.items;
  }

  /**
   * Get config HTML
   * @memberOf BaseView
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
   * @memberOf BaseView
   * @returns {module.BaseElement|*}
   */
  get$item() {
    return this.elements['$' + this.scope.name.toLowerCase()];
  }

  /**
   * Get items $rules
   * @memberOf BaseView
   * @returns {*}
   */
  get$rules() {
    return this.elements.$rules;
  }

  /**
   * Get items $preferences
   * @memberOf BaseView
   * @returns {*}
   */
  get$preferences() {
    return this.elements.$preferences;
  }

  /**
   * Get item DOM Element
   * @memberOf BaseView
   * @returns {BaseElement}
   */
  getDomElement() {
    return this.get$item().$[0];
  }

  /**
   * Get item DOM info
   * @memberOf BaseView
   * @returns {ClientRect}
   */
  getDomData() {
    return this.getDomElement().getBoundingClientRect();
  }

  /**
   * Create style
   * @memberOf BaseView
   * @returns {string}
   */
  createStyle() {
    return [this.getContainerClassName(), this.getConfigHTML('style')].join(' ');
  }

  /**
   * Create UUID
   * @memberOf BaseView
   * @returns {string}
   */
  createUUID() {
    return [this.scope.model.getUUID(), this.getContainerClassName()].join('-');
  }

  /**
   * Render UUID
   * @memberOf BaseView
   * @param id
   * @returns {*|string}
   */
  renderUUID(id) {
    return id || [this.utils.gen.UUID(), this.scope.name.toDash()].join('-');
  }

  /**
   * Define $container
   * @memberOf BaseView
   * @param $container
   */
  defineContainer($container) {

    /**
     * Define container
     * @memberOf BaseView.elements
     */
    this.elements.$container = $container;
  }

  /**
   * Get container class name
   * @memberOf BaseView
   * @returns {string}
   */
  getContainerClassName() {
    return this.getConfigHTML().selector;
  }

  /**
   * Get container selector
   * @memberOf BaseView
   * @returns {*|jQuery}
   */
  getContainerSelector() {
    const containment = this.scope.controller.getContainment();
    return containment.view.get$item().getElementContainer(containment.model.getItemNameSpace());
  }

  /**§§§
   * Check if element cached
   * @memberOf BaseView
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
      this.scope.logger.debug(this.scope.i18n.t('element.already.rendered').replace(/\{0}/, Constructor.name));
    }

    return cached;
  }

  /**
   * Check if render force
   * @memberOf BaseView
   * @returns {boolean}
   */
  isCachedItems() {
    return !!Object.keys(this.elements.items || {}).length;
  }

  /**
   * Render Header
   * @memberOf BaseView
   * @param $container
   * @return {module.HeaderElement|HeaderElement}
   */
  header($container) {

    /**
     * @constant HeaderElement
     * @type {module.HeaderElement}
     */
    const HeaderElement = require('../../element/header.element.js');

    /**
     * Define $header
     * @memberOf BaseView.elements
     * @type {module.HeaderElement}
     */
    this.elements.$header = new HeaderElement(this, {
      style: [this.scope.name.toDash(), 'header'].join('-'),
      $container: $container.$,
      append: false
    });

    /**
     * Define scope
     * @type {{}}
     */
    const scope = this.scope;

    scope.observer.publish(scope.eventManager.eventList.successRenderHeader, [
      this.elements.$header, this.getConfigHTML('header')]);

    return this.elements.$header;
  }

  /**
   * Render Footer
   * @memberOf BaseView
   * @param $container
   * @returns {module.FooterElement}
   */
  footer($container) {

    /**
     * @constant FooterElement
     * @type {module.FooterElement}
     */
    const FooterElement = require('../../element/footer.element.js');

    /**
     * Define $footer
     * @memberOf BaseView.elements
     * @type {module.FooterElement}
     */
    this.elements.$footer = new FooterElement(this, {
      style: [this.scope.name.toDash(), 'footer panel-footer'].join('-'),
      $container: $container.$
    });

    /**
     * Define scope
     * @type {{}}
     */
    const scope = this.scope;

    scope.observer.publish(scope.eventManager.eventList.successRenderFooter, [
      this.elements.$footer, this.getConfigHTML('footer')]);

    return this.elements.$footer;
  }

  /**
   * Render Header
   * @memberOf BaseView
   * @param {string} title
   */
  renderHeader(title) {
    this.header(this.get$container()).setText(title);
  }

  /**
   * Render Footer
   * @memberOf BaseView
   * @param {object} $element
   */
  renderFooter($element) {
    this.footer(this.get$container()).setHtml($element.getFooter());
  }

  /**
   * Render filter
   * @memberOf BaseView
   * @param {function} [callback]
   * @param {boolean} [enter]
   */
  renderFilter(callback, enter) {

    /**
     * @constant FilterElement
     * @type {module.FilterElement}
     */
    const FilterElement = require('../../element/filter.element.js');

    /**
     * Define Search element
     * @memberOf BaseView.elements
     * @type {module.FilterElement}
     */
    this.elements.$filter = new FilterElement(this, {
      $container: this.get$container().$,
      style: [this.scope.name.toDash(), 'filter'].join(' '),
      callback: callback,
      enter: enter
    });
  }

  /**
   * Define get $container
   * @memberOf BaseView
   * @returns {*}
   */
  get$container() {
    const $container = this.elements.$container;

    if (!$container) {
      this.scope.logger.error('Unable to fetch $container', this.elements);
      return {};
    }

    return $container;
  }

  /**
   * Generic modal dialog window
   * @memberOf BaseView
   * @param {{
   *  [style]: String,
   *  $container,
   *  [cover]: Boolean,
   *  [coverOpacity]: Number,
   *  [autoclose]: Boolean,
   *  [closeX]: Boolean,
   *  [css],
   *  [opacityOff]: Number,
   *  [opacityOn]: Number,
   *  [title]: String,
   *  [type]: String ('info', 'success', 'warning', 'danger'),
   *  [html]: *,
   *  [text]: String,
   *  [draggable]: Boolean,
   *  [items],
   *  [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
   *  [buttons]
   * }} opts
   */
  modalDialog(opts) {

    /**
     * @constant ModalElement
     * @type {module.ModalElement}
     */
    const ModalElement = require('../../element/modal.element.js');

    /**
     * Define $modal
     * @memberOf BaseView.elements
     * @type {module.ModalElement}
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
   * @memberOf BaseView
   * @returns {ModalElement}
   */
  get$modal() {
    return this.elements.$modal;
  }

  /**
   * Generic button
   * @memberOf BaseView
   * @param {{
   *  $container,
   *  [$htmlElement],
   *  style,
   *  text,
   *  type,
   *  disabled,
   *  events
   * }} opts
   * @param {*} store
   */
  button(opts, store) {

    /**
     * @constant ButtonElement
     * @type {module.ButtonElement}
     */
    const ButtonElement = require('../../element/button.element.js');

    $.each(opts || {}, (i, button) => {

      /**
       * Define button
       * @type {ButtonElement}
       */
      store[i] = new ButtonElement(this, {
        $container: button.$container,
        $htmlElement: button.$htmlElement,
        style: i.toDash(),
        type: button.type,
        text: button.text,
        disabled: button.disabled,
        events: button.events
      });

      $.each(button.events || {}, (key, event) => store[i].$.on(key + '.afterCallback',
          store[i].afterEventsCallback.bind(store[i])));

      this.scope.logger.debug('Button created', store[i]);
    });
  }

  /**
   * Define cover
   * @memberOf BaseView
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
   * @memberOf BaseView
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
   * @memberOf BaseView
   */
  updateScrollCover() {
    this.get$item().scrollCover(
        this.get$container().$
    );
  }
};