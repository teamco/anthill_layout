/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
import {WidgetGeneratorCore} from './widget/widget.generator.core';
import {WidgetGeneratorEdit} from './widget/widget.generator.edit';
import {WidgetGeneratorExternal} from './widget/widget.generator.external';
import {WidgetGeneratorForm} from './widget/widget.generator.form';

const aggregation = require('../../../../lib/extends/aggregation');

/**
 * @class SiteConfigWidgetGenerator
 */
export class SiteConfigWidgetGenerator extends aggregation(WidgetGeneratorCore, WidgetGeneratorEdit,
    WidgetGeneratorExternal, WidgetGeneratorForm) {

  /**
   * Define widget generator
   * @memberOf SiteConfigWidgetGenerator
   */
   widgetGenerator() {

    // Workaround for back button
    this.controller.loadWidgetsList();
  }

  /**
   * Define widgets list
   * @memberOf SiteConfigWidgetGenerator
   */
   loadWidgetsList() {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    if (gallery) {
      this.scope.view.showWidgetsList(
          gallery.model.staticData.getDefaultData(), [
            'name', 'thumbnail', 'resource'
          ]
      );
    }
  }

  /**
   * Define on before send widget's data
   * @property SiteConfigWidgetGenerator
   * @param xhr
   * @param opts
   * @protected
   */
   _beforeSendWidgetData(xhr, opts) {

    /**
     * Define abort xhr
     * @param xhr
     * @returns {boolean}
     * @private
     */
    function _abort(xhr) {
      xhr.abort();
      return false;
    }

    /**
     * Get scope controller
     * @type {SiteConfigController}
     */
    const controller = this.controller,
        scope = controller.scope;

    const data = this.data,
        validate = controller.i18n.t('widget.generation.inputs.validate');

    if (!data) {

      scope.view.get$modal().handleNotification(validate, 'warning');
      scope.logger.warn(validate, xhr, opts);

      // Allow to create another one
      controller.stopSendingEventOnApprove(false);

      return _abort(xhr);
    }

    if (data.validate || data.empty) {

      data.$modal.handleNotification(validate, 'warning');
      scope.logger.warn(validate, xhr, opts);

      // Allow to create another one
      controller.stopSendingEventOnApprove(false);

      return _abort(xhr);
    }

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = controller.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    const exist = controller.i18n.t('widget.generation.resource.exist'),
        abort = controller.i18n.t('widget.generation.ajax.abort');

    if (gallery && data.collector && gallery.model.staticData.isExistResource(data.collector.resource)) {

      data.$modal.handleNotification(exist, 'warning');
      scope.logger.warn(exist, xhr, opts);

      // Allow to create another one
      controller.stopSendingEventOnApprove(false);

      return _abort(xhr);
    }

    if (controller.stopSendingEventOnApprove(true)) {

      data.$modal.handleNotification(abort, 'warning');
      scope.logger.warn(abort, xhr, opts);

      return _abort(xhr);
    }
  }

  /**
   * Define on error send widget's data
   * @property SiteConfigWidgetGenerator
   * @param xhr
   * @param status
   * @param description
   * @protected
   */
  _onErrorSendWidgetData(xhr, status, description) {

    // Call super
    $.ajaxSettings.error.call(this.controller, arguments);

    this.data.$modal.handleNotification(description, 'danger');

    // Allow to create another one
    this.controller.stopSendingEventOnApprove(false);
  }

  /**
   * Define Stop Sending Event On Approve
   * @memberOf SiteConfigWidgetGenerator
   * @param {boolean} disable
   * @returns {*|boolean}
   */
   stopSendingEventOnApprove(disable) {

    /**
     * Get $modal
     * @type {ModalElement}
     */
    const $modal = this.scope.view.get$modal(),
        $approve = $modal.$buttons.approve;

    if (disable) {
      return $approve.disabled;

    } else {

      // Disable approve button
      $approve.disabled = disable;
    }
  }

  /**
   * Define on success handler
   * @memberOf SiteConfigWidgetGenerator
   * @param data
   * @param status
   * @param xhr
   * @protected
   */
   _handleSuccessSendWidgetData(data, status, xhr) {

    this.scope.logger.debug(this.i18n.t('widget.generated.ok').replace(/\{1}/, data.name), arguments);

    // Allow to create another one
    this.stopSendingEventOnApprove(false);
  }
}


