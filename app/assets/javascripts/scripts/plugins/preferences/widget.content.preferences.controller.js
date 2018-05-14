/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:26 PM
 */

/**
 * @class WidgetContentPreferencesController
 * @type {module.WidgetContentPreferencesController}
 */
module.exports = class WidgetContentPreferencesController {

  /**
   * Load prefs
   * @memberOf WidgetContentPreferencesController
   */
  loadPreferences() {

    /**
     * Get widget
     * @type {Widget|*}
     */
    const widget = this.controller.getContainment(),
        globalPrefs = widget.model.getConfig('preferences'),
        localPrefs = this.model.preferences || {};

    let index, value;

    for (index in localPrefs) {

      if (localPrefs.hasOwnProperty(index) && globalPrefs.hasOwnProperty(index)) {
        value = globalPrefs[index];

        /**
         * Define method name
         * @type {string}
         */
        const setter = 'set' + index.toCamel().capitalize();

        if (typeof(this.model[setter]) !== 'function') {

          /**
           * Define setter
           * @type {Function}
           */
          const fn = this.utils.fn.create({
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
   * @memberOf WidgetContentPreferencesController
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
};
