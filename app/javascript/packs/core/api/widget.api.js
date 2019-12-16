/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */
import {BaseAPI} from '../../modules/API';

export class WidgetAPI extends BaseAPI {

  /**
   * @param {Widget} scope
   * @param {string} name
   * @constructor
   */
  constructor(name, scope) {
    super('WidgetAPI', scope);
  }

  /**
   * Init drag api
   * @memberOf WidgetAPI
   */
  initDrag() {
    this._setInteraction('initDraggable');
  }

  /**
   * Enable drag api
   * @memberOf WidgetAPI
   */
  enableDrag() {
    this._setInteraction('enableDraggable');
  }

  /**
   * Disable drag api
   * @memberOf WidgetAPI
   */
  disableDrag() {
    this._setInteraction('disableDraggable');
  }

  /**
   * Destroy drag api
   * @memberOf WidgetAPI
   */
  destroyDrag() {
    this._setInteraction('destroyDraggable');
  }

  /**
   * Init resize api
   * @memberOf WidgetAPI
   */
  initResize() {
    this._setInteraction('initResizable');
  }

  /**
   * Enable resize api
   * @memberOf WidgetAPI
   */
  enableResize() {
    this._setInteraction('enableResizable');
  }

  /**
   * Disable resize api
   * @memberOf WidgetAPI
   */
  disableResize() {
    this._setInteraction('disableResizable');
  }

  /**
   * Destroy resize api
   * @memberOf WidgetAPI
   */
  destroyResize() {
    this._setInteraction('destroyResizable');
  }

  /**
   * Set interaction
   * @memberOf WidgetAPI
   * @param {string} interaction
   * @private
   */
  _setInteraction(interaction) {
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList[interaction]);
  }
}

  