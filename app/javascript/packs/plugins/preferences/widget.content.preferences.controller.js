/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:26 PM
 */

import {LibFunction} from 'js/modules/base/Function';

/**
 * @class WidgetContentPreferencesController
 * @export WidgetContentPreferencesController
 */
export class WidgetContentPreferencesController {

  /**
   * Load prefs
   * @property widgetContentPreferencesController
   */
  loadPreferences() {

    /**
     * Get widget
     * @type {Widget|*}
     */
    const widget = this.controller.getContainment();

    const globalPrefs = widget.model.getConfig('preferences'),
        localPrefs = this.model.preferences || {};

    let index, value;

    for (index in localPrefs) {
      if (Object.prototype.hasOwnProperty.call(localPrefs, index) &&
          Object.prototype.hasOwnProperty.call(globalPrefs, index)) {
        value = globalPrefs[index];

        /**
         * Define method name
         * @type {string}
         */
        const setter = 'set' + index.toCamelCase().capitalize();

        if (typeof (this.model[setter]) !== 'function') {

          /**
           * Define setter
           * @type {Function}
           */
          const fn = LibFunction.create({
            name: setter,
            params: index,
            body: 'this.setPrefs("' + index + '", ' + index + ');' +
            this.controller.getCustomPublisher(index),
            scope: this.model.constructor.prototype
          });

          this.logger.debug('Define model setter', fn, index, setter);
        }

        this.model[setter](value);
      }
    }
  }

  /**
   * Transfer preferences to containment
   * @property widgetContentPreferencesController
   * @param index
   * @param value
   */
  transferContentPreferences(index, value) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.controller.getContainment();
    widget.observer.publish(widget.eventManager.eventList.transferPreferences, [index, value]);
  }
}
