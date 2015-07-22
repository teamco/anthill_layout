/**
 * Created by teamco on 11/4/14.
 */

define([
        'plugins/site.config/mvc/controller/widget/widget.generator.form',
        'plugins/site.config/mvc/controller/widget/widget.generator.core',
        'plugins/site.config/mvc/controller/widget/widget.generator.external',
        'plugins/site.config/mvc/controller/widget/widget.generator.edit'
    ],

    /**
     * @param {WidgetGeneratorForm} WidgetGeneratorForm
     * @param {WidgetGeneratorCore} WidgetGeneratorCore
     * @param {WidgetGeneratorExternal} WidgetGeneratorExternal
     * @param {WidgetGeneratorEdit} WidgetGeneratorEdit
     */
    function defineSiteConfigWidgetGenerator(WidgetGeneratorForm, WidgetGeneratorCore, WidgetGeneratorExternal, WidgetGeneratorEdit) {

        /**
         * Define SiteConfig Widget Generator
         * @class SiteConfigWidgetGenerator
         * @extends AntHill
         * @extends PluginController
         * @extends Routes
         * @constructor
         */
        var SiteConfigWidgetGenerator = function SiteConfigWidgetGenerator() {
        };

        return SiteConfigWidgetGenerator.extend(
            'SiteConfigWidgetGenerator', {

                /**
                 * Define widget generator
                 * @memberOf SiteConfigWidgetGenerator
                 */
                widgetGenerator: function widgetGenerator() {

                    // Workaround for back button
                    this.controller.loadWidgetsList();
                },

                /**
                 * Define widgets list
                 * @memberOf SiteConfigWidgetGenerator
                 */
                loadWidgetsList: function loadWidgetsList() {

                    /**
                     * Get gallery
                     * @type {Gallery}
                     */
                    var gallery = this.getGalleryModule();

                    if (gallery) {
                        this.scope.view.showWidgetsList(
                            gallery.model.staticData.getDefaultData(), [
                                'name', 'thumbnail', 'resource'
                            ]
                        );
                    }
                },

                /**
                 * Define on before send widget's data
                 * @property SiteConfigWidgetGenerator
                 * @param xhr
                 * @param opts
                 * @private
                 */
                _beforeSendWidgetData: function _beforeSendWidgetData(xhr, opts) {

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
                    var controller = this.controller,
                        scope = controller.scope,
                        data = this.data,
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
                     * Get gallery
                     * @type {Gallery}
                     */
                    var gallery = controller.getGalleryModule(),
                        exist = controller.i18n.t('widget.generation.resource.exist'),
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
                },

                /**
                 * Define on error send widget's data
                 * @property SiteConfigWidgetGenerator
                 * @param xhr
                 * @param status
                 * @param description
                 * @private
                 */
                _onErrorSendWidgetData: function (xhr, status, description) {

                    // Call super
                    $.ajaxSettings.error.call(this.controller, arguments);

                    this.data.$modal.handleNotification(description, 'error');

                    // Allow to create another one
                    this.controller.stopSendingEventOnApprove(false);
                },

                /**
                 * Define Stop Sending Event On Approve
                 * @memberOf SiteConfigWidgetGenerator
                 * @param {boolean} disable
                 * @returns {*|boolean}
                 */
                stopSendingEventOnApprove: function stopSendingEventOnApprove(disable) {

                    /**
                     * Get $modal
                     * @type {ModalElement}
                     */
                    var $modal = this.scope.view.get$modal(),
                        $approve = $modal.$buttons.approve;

                    if (disable) {

                        return $approve.disabled;

                    } else {

                        // Disable approve button
                        $approve.disabled = disable;
                    }
                },

                /**
                 * Define on success handler
                 * @memberOf SiteConfigWidgetGenerator
                 * @param data
                 * @param status
                 * @param xhr
                 * @private
                 */
                _handleSuccessSendWidgetData: function _handleSuccessSendWidgetData(data, status, xhr) {

                    this.scope.logger.debug(
                        this.i18n.t('widget.generated.ok').
                            replace(/\{1}/, data.name),
                        arguments
                    );

                    // Allow to create another one
                    this.stopSendingEventOnApprove(false);
                }
            },

            WidgetGeneratorForm.prototype,
            WidgetGeneratorCore.prototype,
            WidgetGeneratorExternal.prototype,
            WidgetGeneratorEdit.prototype
        );
    }
);