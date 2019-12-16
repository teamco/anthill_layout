/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseController} from '../../modules/Controller';
import {Interactions} from '../../modules/Interactions';
import {WidgetComment} from './widget/widget.comment';
import {WidgetScroll} from './widget/widget.scroll';
import {WidgetParallax} from './widget/widget.parallax';
import {WidgetMaximize} from './widget/widget.maximize';
import {WidgetLayer} from './widget/widget.layer';
import {WidgetExpand} from './widget/widget.expand';
import {WidgetZoom} from './widget/widget.zoom';
import {WidgetInteractions} from './widget/widget.interactions';
import {WidgetStretch} from './widget/widget.stretch';
import {WidgetStick} from './widget/widget.stick';
import {WidgetContent} from './widget/widget.content';
import {aggregation} from '../../lib/extends/aggregation';

/**
 * @class WidgetController
 * @extends {BaseController}
 */
export class WidgetController extends aggregation(BaseController, Interactions, WidgetComment,
    WidgetInteractions, WidgetContent, WidgetExpand, WidgetLayer, WidgetMaximize, WidgetParallax, WidgetScroll,
    WidgetStick, WidgetStretch, WidgetZoom) {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WidgetController', scope, false);

    if (!this.getAvailableContent) {
      this.scope.logger.warn('No available widget resource content');
      this.getAvailableContent = undefined;
    }
  }

  /**
   * Get config
   * @memberOf WidgetController
   * @param {string} type
   */
  getInteractionConfig(type) {

    /**
     * Init config
     * @type {*}
     */
    let config = {};

    switch (type) {

      case 'ongoing':

        /**
         * Set config
         * @type {{
         *  animate: boolean,
         *  organize: boolean,
         *  $source: ($|*|Element.$)
         * }}
         */
        config = {
          animate: false,
          organize: true,
          $source: this.scope.wireframe.$
        };
        break;

      case 'stop':

        /**
         * Set config
         * @type {{
         *  animate: boolean,
         *  organize: boolean,
         *  $source: ($|*|Element.$)
         * }}
         */
        config = {
          animate: true,
          organize: true,
          $source: this.scope.view.get$item().$
        };
        break;
    }
    return config;
  }

  /**
   * Get widget interaction prefs
   * @memberOf WidgetController
   * @returns {WidgetModel.interactions}
   */
  getInteractionPreferences() {
    return this.model.interactions;
  }

  /**
   * Get PageElement
   * @memberOf WidgetController
   * @returns {PageElement}
   */
  get$page() {
    return this.getContainment().view.elements.$page;
  }

  /**
   * Get page layout
   * @memberOf WidgetController
   * @returns {Layout}
   */
  getPageLayout() {
    return this.getContainment().controller.getLayout();
  }

  /**
   * Get merged local padding from widget dom
   * @memberOf WidgetController
   * @returns {{top: number, right: number, bottom: number, left: number}|*}
   */
  getLocalPadding() {
    const padding = {},
        global = this.getGlobalPadding(),
        local = this.scope.dom.padding || {};

    this.scope.logger.debug('Merge local padding', window.$.extend(padding, global, local));
    return padding;
  }

  /**
   * Get global padding from layout config
   * @memberOf WidgetController
   * @returns {{top: number, right: number, bottom: number, left: number}}
   */
  getGlobalPadding() {

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.getPageLayout();

    /**
     * Get padding
     * @type {{top: number, right: number, bottom: number, left: number}|*}
     */
    const padding = layout.config.grid.padding;
    this.scope.logger.debug('Get global padding', padding);
    return padding;
  }

  /**
   * Define custom class name
   * @memberOf WidgetController
   * @param {string} name
   * @param {string} previous
   */
  customClassName(name, previous) {

    /**
     * Get $widget
     * @type {WidgetElement}
     */
    const $widget = this.view.get$item();

    $widget.$.removeClass(previous);
    if (name && name.length) {
      $widget.$.addClass(name);
    }
  }

  /**
   * Toggle freeze
   * @memberOf WidgetController
   * @param {boolean} freeze
   */
  toggleFreeze(freeze) {

    /**
     * Get $widget
     * @type {WidgetElement}
     */
    const $widget = this.view.get$item();
    $widget.freezePosition(freeze);
  }

  /**
   * Behavior mode
   * @memberOf WidgetController
   * @param {{animate: Boolean, [callback]: Function, [type]: String, $source}} opts
   * @param {string} type
   */
  behaviorMode(opts, type) {

    /**
     * Check if mod
     * @type {string}
     */
    const mode = this.isMode();

    /**
     * Set event type
     * @type {string}
     */
    opts.type = type;

    if (mode && this[mode + 'Mode']) {
      this[mode + 'Mode'](opts, mode, this.getPageLayout().controller.getBehavior());
    }
  }

  /**
   * Define snap2grid mode
   * @memberOf WidgetController
   * @param opts
   * @param mode
   * @param behavior
   */
  jqUIGridMode(opts, mode, behavior) {
    this.scope.wireframe.hide();
    this.scope.map.sticker(opts, mode, behavior);
  }

  /**
   * Define free style mode
   * @memberOf WidgetController
   * @param opts
   * @param mode
   * @param behavior
   */
  // freeStyleMode(opts, mode, behavior) {
  // TODO
  // }

  /**
   * Define snap2grid mode
   * @memberOf WidgetController
   * @param opts
   * @param mode
   * @param behavior
   */
  snap2gridMode(opts, mode, behavior) {
    this.scope.map.sticker(opts, mode, behavior);
  }

  /**
   * Check behavior mode
   * @memberOf WidgetController
   * @returns {string|undefined}
   */
  isMode() {
    const modes = this.getContainment().LAYOUT_MODES,
        layout = this.getPageLayout(),
        mode = layout.config.mode;
    return modes[mode];
  }

  /**
   * Save widget DOM
   * @memberOf WidgetController
   */
  saveDom() {
    this.logger.debug(this.i18n.t('save.widget'));

    /**
     * @constant
     * @type {Page}
     */
    const page = this.controller.getContainment();

    if (page.contentLoaded) {
      this.model.defineDOM();
    } else {
      page.logger.debug('Content not loaded yet');
    }
  }
}