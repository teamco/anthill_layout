/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

import $ from 'jquery';
import {AntHill} from '../core/config/anthill';
import {FooterElement} from '../core/element/footer.element';
import {HeaderElement} from '../core/element/header.element';
import {FilterElement} from '../core/element/filter.element';
import {ModalElement} from '../core/element/modal.element';
import {ButtonElement} from '../core/element/button.element';
import {LibGenerator} from 'js/modules/base/Generator';

/**
 * Define base view
 * @class BaseView
 * @extends AntHill
 */
export class BaseView extends AntHill {

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
   * @static
   * @returns {jQuery|HTMLElement}
   */
  static defaultRoot() {
    return $('body');
  }

  /**
   * Define update elements items
   * @memberOf BaseView
   * @param $item
   * @param {string} [customId]
   */
  updateElementItems($item, customId) {
    this.elements.items = this.elements.items || {};
    this.elements.items[customId ? customId : $item.id] = $item;
  }

  /**
   * Clean elements items
   * @memberOf BaseView
   */
  cleanElementItems() {

    // clean content
    this.get$item().empty();
    this.destroyElementItems();
  }

  /**
   * @memberOf BaseView
   */
  destroyElementItems() {
    for (let index in this.elements.items) {
      if (Object.prototype.hasOwnProperty.call(this.elements.items, index)) {
        this.elements.items[index].$.off().remove();
      }
    }

    delete this.elements.items;
  }

  /**
   * @memberOf BaseView
   * @returns {*}
   */
  getContentElements() {
    return this.elements.items;
  }

  /**
   * @method getContentElementBy
   * @memberOf BaseView
   * @param {string} type
   * @param {string} value
   * @returns {*}
   */
  getContentElementBy(type, value) {
    const elements = this.getContentElements();
    for (let index in elements) {
      if (Object.prototype.hasOwnProperty.call(elements, index)) {
        if (elements[index][type] === value) {
          return elements[index];
        }
      }
    }
    this.scope.logger.warn('Undefined content item', elements, arguments);
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

    return key ? model.getConfig(`html/${key}`) :
        model.getConfig('html');
  }

  /**
   * Get item.$
   * @memberOf BaseView
   * @returns {BaseElement|*}
   */
  get$item() {
    return this.elements[`$${this.scope.name.toLowerCase()}`];
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
    return `${this.getContainerClassName()} ${this.getConfigHTML('style')}`;
  }

  /**
   * Create UUID
   * @memberOf BaseView
   * @returns {string}
   */
  createUUID() {
    return `${this.scope.model.getUUID()}-${this.getContainerClassName()}`;
  }

  /**
   * Render UUID
   * @memberOf BaseView
   * @param id
   * @returns {*|string}
   */
  renderUUID(id) {
    return id || `${this.scope.name.toDash()}-${LibGenerator.UUID()}`;
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

    // Test fallback
    if (!containment) {
      this.scope.logger.warn('Undefined containment. Render in default root');
      return BaseView.defaultRoot();
    }

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
   * @return {HeaderElement}
   */
  header($container) {

    /**
     * Define $header
     * @memberOf BaseView.elements
     * @type {HeaderElement}
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
      this.elements.$header, this.getConfigHTML('header')
    ]);

    return this.elements.$header;
  }

  /**
   * Render Footer
   * @memberOf BaseView
   * @param $container
   * @returns {FooterElement}
   */
  footer($container) {

    /**
     * Define $footer
     * @memberOf BaseView.elements
     * @type {FooterElement}
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
      this.elements.$footer, this.getConfigHTML('footer')
    ]);

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
   * @memberOf BaseView
   * @param {function} [callback]
   * @param {boolean} [enter]
   */
  renderFilterElement(callback, enter) {

    /**
     * Define Search element
     * @memberOf BaseView.elements
     * @type {FilterElement}
     */
    this.elements.$filter = new FilterElement(this, {
      $container: this.get$container().$,
      style: [this.scope.name.toDash(), 'filter'].join(' '),
      callback: callback,
      enter: enter,
      append: true
    });
  }

  /**
   * @method getElementByTagName
   * @memberOf BaseView
   * @static
   * @param e
   * @param {string} tag
   * @return {*|jQuery|HTMLElement}
   */
  static getElementByTagName(e, tag) {

    /**
     * Define $element
     * @type {*|jQuery|HTMLElement}
     */
    let $element = $(e.target);

    if ($element.prop('tagName') !== tag.toUpperCase()) {
      $element = $element.closest(tag.toLowerCase());
    }
    return $element;
  }

  /**
   * Generic modal dialog window
   * @memberOf BaseView
   * @param {{
   *  [style]: String,
   *  $container,
   *  [cover]: Boolean,
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
   *  [callbacks],
   *  [position]: String ('tl/tc/tr', 'cl/cc/cr'. 'bl/bc/br'),
   *  [buttons]
   * }} opts
   */
  modalDialog(opts) {

    /**
     * Define $modal
     * @memberOf BaseView.elements
     * @type {ModalElement}
     */
    this.elements.$modal = new ModalElement(this, {
      style: opts.style,
      $container: opts.$container,
      cover: opts.cover,
      autoclose: opts.autoclose,
      closeX: opts.closeX,
      css: opts.css,
      opacityOff: opts.opacityOff,
      opacityOn: opts.opacityOn,
      title: opts.title,
      type: opts.type,
      callbacks: opts.callbacks,
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

      window.$.each(button.events || {}, key => store[i].$.on(`${key}.afterCallback`,
          store[i].afterEventsCallback.bind(store[i])));

      this.scope.logger.debug('Button created', store[i]);
    });
  }

  /**
   * Locate DOM element in array
   * @memberOf BaseView
   * @static
   * @param {Array} source
   * @param {string} type
   * @returns {*}
   */
  static locateDOMElement(source, type) {
    for (let i = 0, l = source.length; i < l; i++) {
      if ((source[i].tagName + '').toLowerCase() === type) {
        return source[i];
      }
    }
    return {};
  }

  /**
   * Define get $container
   * @memberOf BaseView
   * @returns {BaseElement|{}}
   */
  get$container() {
    let $container = this.elements.$container;

    if (!$container) {
      this.scope.logger.error('Unable to fetch $container', this.elements);
      $container = {};
    }

    return $container;
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
}