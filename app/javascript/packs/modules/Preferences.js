/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/24/14
 * Time: 1:23 PM
 */

import {LibFunction} from 'js/modules/base/Function';

/**
 * @class BasePreferences
 * @type {BasePreferences}
 */
export class BasePreferences {

  /**
   * Update prefs
   * @memberOf BasePreferences
   * @param {ModalElement} $modal
   * @param {boolean} render
   */
  updatePreferences($modal, render) {

    // Get scope
    const scope = this.scope;

    if (!$modal) {
      scope.logger.warn('Unable to get Modal dialog');
      return false;
    }

    const $inputs = $modal.collectInputFields(),
        containment = this.getContainment(),
        cname = scope.name.toDash();

    if ($inputs.hasClass('validate')) {
      scope.logger.warn('Fix incorrect data before submit');
      return false;
    }

    /**
     * Validate setter
     * @param {{scope, setter, name, value, type}} opts
     * @private
     */
    function _validateSetter(opts) {

      /**
       * Define callback
       * @private
       */
      function _validateCallback() {
        opts.scope.logger.debug('Validate prefs callback', opts);
        setter.bind(opts.scope.model)(opts.value);
        opts.scope.observer.publish(opts.event, [opts.name, opts.value]);
      }

      // Define setter as a function
      let setter = opts.scope.model[opts.setter],
          name = opts.name;

      if (typeof (setter) === 'function') {
        return _validateCallback();
      }

      if (!name.length) {
        opts.scope.logger.debug('Skip model setter', opts);
        return false;
      }

      if (opts.type !== 'radio' || (opts.type === 'radio' && opts.setter !== 'on')) {
        opts.scope.logger.debug('Undefined model setter', opts);

        // Toggle method core component <=> widget content
        const method = opts.scope.controller.isCoreComponent() ?
            '_setItemInfoPreferences' : 'setPrefs';

        /**
         * Define setter
         * @type {Function}
         */
        setter = LibFunction.create({
          name: opts.setter,
          params: name,
          body: `this.${method}("${name}", ${name});${opts.scope.controller.getCustomPublisher(opts.name)}`,
          scope: opts.scope.model.constructor.prototype
        });

        opts.scope.logger.debug('Define model setter', setter, opts);
        _validateCallback();
      }
    }

    $inputs.each((index, input) => {

      // Get input class name
      // language=JQuery-CSS
      const inputClass = window.$(input).closest('[class*="-prefs"]').attr('class') || '';

      /**
       * Check if prefs in content
       * @type {boolean}
       */
      let isContentPrefs = inputClass.indexOf(cname) !== -1;
      if (!isContentPrefs) {

        // Check metamorphic
        isContentPrefs = inputClass.indexOf('metamorphic') !== -1;
      }

      const event = isContentPrefs ?
          scope.eventManager.eventList.transferContentPreferences :
          containment.eventManager.eventList.transferPreferences;

      /**
       * Transform input name
       * @type {string|jQuery}
       */
      const name = input.name.toCamelCase().capitalize();

      /**
       * Define method name
       * @type {string}
       */
      let setter = 'set' + name;

      /**
       * Define input value
       * @type {string}
       */
      let value = input.value;

      if (input.type === 'checkbox') {
        value = window.$(input).prop('checked');
      }

      if (input.type === 'radio') {
        setter = value;
      }

      _validateSetter({
        type: input.type,
        name: input.name,
        setter: setter,
        event: event,
        value: value,
        scope: isContentPrefs ? scope : containment
      });
    });

    if (render) {
      scope.view.render();
    }

    $modal.selfDestroy();
    this.store();

    //scope.observer.publish(scope.eventManager.eventList.setEmbeddedContent);
  }
}