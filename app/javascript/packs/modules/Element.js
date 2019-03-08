/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

import $ from 'jquery';
import {Renderer} from './Renderer';

/**
 * Define Base element
 * @class BaseElement
 * @type {BaseElement}
 * @extends Renderer
 */
export class BaseElement extends Renderer {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BaseElement', scope);
  }

  /**
   * Element config before build
   * @memberOf BaseElement
   * @param {BaseView} view
   * @param opts
   * @param $html
   * @returns {BaseElement}
   * @protected
   */
  _config(view, opts, $html) {

    opts = opts || {};

    /**
     * Define view
     * @property BaseElement
     * @type {BaseView}
     */
    this.view = view;

    /**
     * Define style
     * @property BaseElement
     * @type {string}
     */
    this.style = opts.style || view.createStyle();

    /**
     * Define id
     * @property BaseElement
     * @type {string}
     */
    this.id = view.renderUUID(opts.uuid);

    /**
     * Define disabled
     * @property BaseElement
     * @type {boolean}
     */
    this.disabled = this.view.utils.setBoolean(opts.disabled, false);

    /**
     * Define events
     * @property BaseElement
     * @type {*}
     */
    this.events = opts.events;

    /**
     * Define opacity
     * @property BaseElement
     * @type {*|number}
     */
    this.opacity = opts.opacity || 1.0;

    /**
     * Define CSS
     * @property BaseElement
     * @type {*}
     */
    this.css = opts.css || {};

    /**
     * Define jQuery element
     * @property BaseElement
     */
    this.$ = $($html).addClass(this.style).css(this.css);

    if (opts.id) {
      this.$.attr({id: this.id});
    }

    view.controller.updateCache(this.id, this);

    // Get scope
    const scope = view.scope;
    scope.observer.publish(scope.eventManager.eventList.successCreateElement, this);

    return this;
  }

  /**
   * Update uuid after loading
   * @memberOf BaseElement
   */
  updateUUID() {
    this.$.attr({id: this.view.createUUID()});
  }

  /**
   * Get $element by uuid
   * @param {string} uuid
   * @returns {*}
   */
  getElementByUuid(uuid) {
    return this.view.controller.getCache(uuid);
  }

  /**
   * Bind element events
   * @memberOf BaseElement
   */
  bindEvents() {

    const scope = this.view.scope,
        $element = this.$;

    $.each(this.events || [], (index, event) => {
      scope.eventManager.onEvent.bind({
        scope: scope,
        $: $element
      })(event, index);
    });
  }

  /**
   * Get element container
   * @memberOf BaseElement
   * @param {string} title
   * @returns {*}
   */
  getElementContainer(title) {
    return this.$.find(`.${title}s`);
  }

  /**
   * Get text metrics
   * @memberOf BaseElement
   * @param $element
   * @return {Object}
   */
  textMetrics($element) {

    // Define new div
    const $div = $('<div />').appendTo('body');

    $div.css({
      position: 'absolute',
      left: -1000,
      top: -1000,
      display: 'none'
    });

    $div.html($element.html());

    const styles = [
      'font-size',
      'font-style',
      'font-weight',
      'font-family',
      'line-height',
      'text-transform',
      'letter-spacing'
    ];

    styles.forEach(style => {
      const s = style.toString();
      $div.css({s: $element.css(s)});
    });

    /**
     * Set metrics
     * @type {{height: (*|jQuery), width: (*|jQuery)}}
     */
    const metrics = {
      height: $div.outerHeight(true),
      width: $div.outerWidth(true)
    };

    $div.remove();

    return metrics;
  }

  /**
   * Centralize element into container
   * @memberOf BaseElement
   * @param {{$container, $item, css, position: String}} opts
   * Position options:
   *  ['tl' 'tc' 'tr']
   *  ['cl' 'cc' 'cr']
   *  ['bl' 'bc' 'br']
   * @returns {opts.$item}
   */
  setPosition(opts) {

    const rectC = opts.$container[0].getBoundingClientRect(),
        cWidth = rectC.width,
        cHeight = rectC.height,

        $item = opts.$item,
        rectI = $item[0].getBoundingClientRect(),
        eWidth = rectI.width,
        eHeight = rectI.height;

    let offsetLeft = 0,
        offsetTop = 0;

    if ($item.css('position') === 'fixed') {
      offsetLeft = rectC.left;
      offsetTop = rectC.top;
    }

    let top = 'auto',
        bottom = 'auto',
        left = 'auto',
        right = 'auto',
        mw = cWidth - eWidth,
        cw = offsetLeft + (mw / 2),
        mh = cHeight - eHeight,
        ch = offsetTop + (mh / 2);

    if (opts.position === 'tl') {
      top = 0;
      left = 0;
    } else if (opts.position === 'tc') {
      top = 0;
      left = cw;
    } else if (opts.position === 'tr') {
      right = 0;
      top = 0;
    } else if (opts.position === 'cl') {
      top = ch;
      left = 0;
    } else if (opts.position === 'cc') {
      top = ch;
      left = cw;
    } else if (opts.position === 'cr') {
      top = ch;
      right = 0;
    } else if (opts.position === 'bl') {
      bottom = 0;
      left = 0;
    } else if (opts.position === 'bc') {
      bottom = 0;
      left = cw;
    } else if (opts.position === 'br') {
      bottom = 0;
      right = 0;
    }

    /**
     * Define css
     */
    const css = Object.assign({
      left: left,
      right: right,
      top: top,
      bottom: bottom
    }, opts.css);

    return $item.css(css);
  }

  /**
   * Destroy element before create
   * @memberOf BaseElement
   * @param {Boolean} destroy
   */
  destroyB4Create(destroy) {
    if (this.view.utils.setBoolean(destroy, false)) {

      // Get scope
      const scope = this.view.scope;
      let className = this.$.attr('class');
      let removableElementClass = scope.name.toLowerCase();

      if (className) {
        removableElementClass = '.' + className.replace(/ /g, '.');
      }
      const $removableElement = $(removableElementClass, this.$container);
      if (!$removableElement.length) {
        scope.logger.info('Unable to detect removable element', removableElementClass, this.$container);
        return false;
      }
      $removableElement.remove();
      scope.observer.publish(scope.eventManager.eventList.successDestroyElement, this);
    }
  }

  /**
   * Build element
   * @memberOf BaseElement
   * @param {{
   *  $container,
   *  [append]: boolean,
   *  [destroy]: boolean,
   *  [callback]: function
   * }} opts
   * @returns {*}
   */
  build(opts) {

    opts = opts || {};
    opts.destroy = typeof opts.destroy === 'undefined' ? true : opts.destroy;

    /**
     * Define append/prepend
     */
    const prepend = opts.append;

    if (this.$) {

      /**
       * Define $container
       * @memberOf BaseElement
       * @type {*|jQuery|HTMLElement}
       */
      this.$container = $(opts.$container);

      this.destroyB4Create(opts.destroy);

      this.$[prepend ? 'prependTo' : 'appendTo'](opts.$container);

      if (_.isFunction(opts.callback)) {
        opts.callback();
      }
    }

    this.bindEvents();

    // Get scope
    const scope = this.view.scope;
    scope.observer.publish(scope.eventManager.eventList.successBuildElement, this);

    return this;
  }

  /**
   * Destroy element
   * @memberOf BaseElement
   * @returns {*}
   */
  destroy() {

    // Get scope
    const element = this;

    if (!element.view) {
      return false;
    }

    const scope = element.view.scope;

    if (element.$) {
      scope.logger.debug('Destroy element', element);
      element.$.off().remove();
    }

    // Get cache
    const cache = scope.controller.root().cache,
        css = cache.css || {};

    // Remove css
    for (const index in element) {
      if (element.hasOwnProperty(index) && index.match(/LinkCSS/)) {
        const item = element[index];
        const link = css[item.path] || [];
        if (link.length === 1) {
          scope.logger.debug('Destroy element CSS', item.link);
          item.link.parentNode.removeChild(item.link);
          delete css[item.path];
        }
        if (link.length > 1) {
          css[item.path] = _.reject(link, css => element.id === css.id);
        }
      }
    }

    // Remove cache
    delete cache[element.id];

    // Delete element
    _.each(element.view.elements, (val, key) => {
      if (val === element) {
        delete element.view.elements[key];
      }
    });
  }

  /**
   * Hide element
   * @memberOf BaseElement
   * @returns {*}
   */
  hide() {
    this.view.scope.logger.debug('Hide element');
    return this.$.hide();
  }

  /**
   * Clear element internal HTML
   * @memberOf BaseElement
   * @returns {*|Boolean}
   */
  empty() {
    this.view.scope.logger.debug('Clear inner html of the element');
    return this.$.empty();
  }

  /**
   * Fade in effect
   * @memberOf BaseElement
   * @returns {*}
   */
  fadeIn() {
    return this.$.stop(true, true).fadeIn();
  }

  /**
   * Fade out effect
   * @memberOf BaseElement
   * @returns {*}
   */
  fadeOut() {
    return this.$.stop(true, true).fadeOut();
  }

  /**
   * Show element
   * @memberOf BaseElement
   * @returns {*}
   */
  show() {
    return this.$.show();
  }

  /**
   * Remove element inline style
   * @memberOf BaseElement
   */
  removeStyle() {
    this.$.removeAttr('style');
  }

  /**
   * Get root container
   * @memberOf BaseElement
   * @returns {*|HTMLElement}
   */
  getRootContainer() {
    return $(this.view.scope.controller.root().config.html.container);
  }

  /**
   * Set element opacity
   * @memberOf BaseElement
   * @param {Number} opacity
   */
  setOpacity(opacity) {
    this.$.css({
      opacity: opacity
    });
  }

  /**
   * Get position
   * @memberOf BaseElement
   * @returns {{top, left}}
   */
  getPosition() {
    return this.$.position();
  }

  /**
   * Get offset
   * @memberOf BaseElement
   * @returns {{top, left}}
   */
  getOffset() {
    return this.$.offset();
  }

  /**
   * Get element width
   * @memberOf BaseElement
   * @returns {*}
   */
  getWidth() {
    return this.$.outerWidth(true);
  }

  /**
   * Set element width
   * @memberOf BaseElement
   * @param {String|Number} width
   * @returns {Number}
   */
  setWidth(width) {
    this.$.css({
      width: width
    });

    return this.getWidth();
  }

  /**
   * Get element height
   * @memberOf BaseElement
   * @returns {*}
   */
  getHeight() {
    return this.$.outerHeight(true);
  }

  /**
   * Set element height
   * @memberOf BaseElement
   * @param {String|Number} height
   * @returns {Number}
   */
  setHeight(height) {
    this.$.css({
      height: height
    });

    return this.getHeight();
  }

  /**
   * Get CSS attribute
   * @memberOf BaseElement
   * @param {string} value
   * @returns {Number}
   */
  getCSS(value) {
    return this.view.utils.num.str2float(this.$.css(value));
  }

  /**
   * Get z-index
   * @memberOf BaseElement
   * @returns {Number}
   */
  getZIndex() {
    return this.getCSS('z-index') || 0;
  }

  /**
   * Get padding right
   * @memberOf BaseElement
   * @returns {Number}
   */
  getPaddingRight() {
    return this.getCSS('paddingRight');
  }

  /**
   * Get padding left
   * @memberOf BaseElement
   * @returns {Number}
   */
  getPaddingLeft() {
    return this.getCSS('paddingLeft');
  }

  /**
   * Get pudding top
   * @memberOf BaseElement
   * @returns {Number}
   */
  getPaddingTop() {
    return this.getCSS('paddingTop');
  }

  /**
   * Get padding bottom
   * @memberOf BaseElement
   * @returns {Number}
   */
  getPaddingBottom() {
    return this.getCSS('paddingBottom');
  }

  /**
   * Get margin right
   * @memberOf BaseElement
   * @returns {Number}
   */
  getMarginRight() {
    return this.getCSS('marginRight');
  }

  /**
   * Get margin left
   * @memberOf BaseElement
   * @returns {Number}
   */
  getMarginLeft() {
    return this.getCSS('marginLeft');
  }

  /**
   * Get margin top
   * @memberOf BaseElement
   * @returns {Number}
   */
  getMarginTop() {
    return this.getCSS('marginTop');
  }

  /**
   * Get margin bottom
   * @memberOf BaseElement
   * @returns {Number}
   */
  getMarginBottom() {
    return this.getCSS('marginBottom');
  }

  /**
   * Get left delta
   * @memberOf BaseElement
   * @returns {Number}
   */
  getLeftDelta() {
    return this.getPaddingLeft() + this.getMarginLeft();
  }

  /**
   * Get top delta
   * @memberOf BaseElement
   * @returns {Number}
   */
  getTopDelta() {
    return this.getPaddingTop() + this.getMarginTop();
  }

  /**
   * Get $items
   * @memberOf BaseElement
   * @returns {*|jQuery|HTMLElement}
   */
  get$items() {

    /**
     * Define scope;
     */
    const scope = this.view.scope;

    /**
     * Get item
     * @type {*}
     */
    const item = scope.model.getCurrentItem();

    /**
     * Get item constructor name
     * @type {string}
     */
    const cname = item.name.toLowerCase();

    return $('.' + cname, this.$);
  }

  /**
   * Set html
   * @memberOf BaseElement
   * @param html
   * @param [$container]
   * @returns {boolean}
   */
  setHtml(html, $container) {

    if (!(this.$ && html)) {
      return false;
    }

    $container ? $container.append(html) : this.addContent(html);
  }

  /**
   * Set text
   * @memberOf BaseElement
   * @param {string} text
   * @param [$container]
   * @returns {boolean}
   */
  setText(text, $container) {

    if (!(this.$ && text)) {
      return false;
    }

    // Define text holder
    const $text = $('<span />').text(text);

    $container ? $container.html($text) : this.addContent($text);
  }

  /**
   * Set title
   * @memberOf BaseElement
   * @param {string} title
   */
  setTitle(title) {
    if (!this.$) {
      return false;
    }
    this.$.attr({title: title});
  }

  /**
   * Unbind element
   * @memberOf BaseElement
   * @returns {BaseElement}
   */
  unbindElement() {
    if (this.$) {
      this.$.find('*').off();
      this.$.off();
    }
    return this;
  }

  /**
   * Add scroll cover
   * @memberOf BaseElement
   * @param $container
   */
  scrollCover($container) {
    if (!$('.scroll-cover', $container).length) {
      $('<div class="scroll-cover" />').appendTo($container).append(this.$, '<div class="clear" />');
    }
  }

  /**
   * Adopt modal dialog position on content config
   * @memberOf BaseElement
   */
  adoptModalDialogPosition() {

    const scope = this.view.scope,
        referrer = scope.referrer;

    /**
     * Get modal dialog
     * @type {ModalElement}
     */
    const $modal = referrer ?
        referrer.view.elements.$modal :
        scope.view.elements.$modal;

    if ($modal) {

      $modal.setPosition({
        $container: $modal.$container,
        $item: $modal.$,
        position: $modal.position
      });
    }
  }

  /**
   * Remove loading class after loading items
   * @memberOf BaseElement
   */
  hideLoader() {

    /**
     * Get $root
     * @type {ApplicationElement|{$container}}
     */
    const $root = this.view.controller.root().view.get$item();
    $root.$container.removeClass((index, className) => (className.match(/(^|\s)load\S+/g) || []).join(' '));
  }

  /**
   * Add loading class before loading items
   * @memberOf BaseElement
   * @param {string} type
   */
  showLoader(type) {

    /**
     * Get $root
     * @type {ApplicationElement|{$container}}
     */
    const $root = this.view.controller.root().view.get$item();
    $root.$container.addClass(`loading load-${type}`);
  }

  /**
   * Render items list
   * @memberOf BaseElement
   * @param {Array} items
   * @returns {string}
   */
  getItemsList(items) {
    return `<ul class="remove">
        ${$.map(items, (item, i) => `<li rel="${item.model.getUUID()}">${item.model.getItemTitle()}</li>`).join('')}
      </ul>`;
  }

  /**
   * Get site description
   * @memberOf BaseElement
   * @returns {string}
   */
  getSiteDescription() {
    return $('meta[name="description"]').attr('content');
  }

  /**
   * Set site description
   * @memberOf BaseElement
   * @param {string} description
   */
  setSiteDescription(description) {
    $('meta[name="description"]').attr('content', description);
  }

  /**
   * Get site description
   * @memberOf BaseElement
   * @returns {string}
   */
  getSiteKeywords() {
    return $('meta[name="keywords"]').attr('content');
  }

  /**
   * Set site description
   * @memberOf BaseElement
   * @param {string} keywords
   */
  setSiteKeywords(keywords) {
    $('meta[name="keywords"]').attr('content', keywords);
  }

  /**
   * Check if content has iframe
   * @memberOf BaseElement
   * @returns {number}
   */
  hasIframe() {
    return $('iframe', this.$).length;
  }

  /**
   * Check if content has flash
   * @memberOf BaseElement
   * @returns {number}
   */
  hasFlash() {
    return $('object', this.$).length || $('embed', this.$).length;
  }

  /**
   * Define sort asc/desc
   * @memberOf BaseElement
   * @param $element
   * @returns {boolean}
   */
  defineSorted($element) {
    const sortBy = $element.attr('sorted') === 'asc' ? 'desc' : 'asc';
    $element.attr('sorted', sortBy);
    return $element.attr('sorted') === 'asc';
  }

  /**
   * Define sort text @element
   * @memberOf BaseElement
   * @param {Event} event
   */
  sortTextElements(event) {
    const $container = this.$container,
        $element = this.$element,
        on = this.which,
        selector = this.selector;

    /**
     * Get sorted value
     * @type {*|boolean}
     */
    const sorted = $element.defineSorted($(event.target));
    $(on, $container).sort((a, b) => {
      let t1, t2;
      if (selector) {
        t1 = $(selector, a).text();
        t2 = $(selector, b).text();
      } else {
        t1 = $(a).text();
        t2 = $(b).text();
      }
      if (t1 < t2) return sorted ? -1 : 1;
      if (t1 > t2) return sorted ? 1 : -1;
      return 0;
    }).appendTo($container);
  }

  /**
   * Locate element
   * @memberOf BaseElement
   * @param {BaseElement} [$element]
   * @param {Event} event
   * @returns {boolean}
   */
  locate$element(event, $element) {
    if (!$element) {
      $element = this;
    }

    /**
     * Hide border on locate element
     * @private
     */
    function _hideBorder() {
      $element.$.removeClass('select');
    }

    $element.$.parent().children().removeClass('select');
    $element.$.addClass('select');

    if (event.type === 'mouseleave' || event.type === 'click') {
      setTimeout(_hideBorder, 300);
    }
  }

  /**
   * isModal element
   * @memberOf BaseElement
   * @returns {boolean}
   */
  isModal() {
    return this.name === 'ModalElement';
  }

  /**
   * Check if metamorphic element
   * @memberOf BaseElement
   * @returns {boolean}
   */
  isMetamorphicElement() {
    return this.$.hasClass('metamorphic');
  }

  /**
   * Define add content if defined
   * @memberOf BaseElement
   */
  addContent(embed) {
    if (!embed) {
      this.$.empty();
      return false;
    }
    this.$.append(embed);
    return this;
  }
}