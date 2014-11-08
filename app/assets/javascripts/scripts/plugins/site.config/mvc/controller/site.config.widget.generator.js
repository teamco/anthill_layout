/**
 * Created by i061485 on 11/4/14.
 */

define(function defineSiteConfigWidgetGenerator() {

    /**
     * Define SiteConfig Widget Generator
     * @class SiteConfigWidgetGenerator
     * @constructor
     */
    var SiteConfigWidgetGenerator = function SiteConfigWidgetGenerator() {

    };

    return SiteConfigWidgetGenerator.extend('SiteConfigWidgetGenerator', {

        /**
         * Define widget generator
         * @member SiteConfigWidgetGenerator
         */
        widgetGenerator: function widgetGenerator() {

            // Workaround for back button
            this.controller.loadWidgetsList();
        },

        /**
         * Define widgets list
         * @member SiteConfigWidgetGenerator
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
         * Define create widget step
         * @member SiteConfigWidgetGenerator
         */
        nextWidgetGenerator: function nextWidgetGenerator() {

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = this.getGalleryModule();

            if (gallery) {
                this.scope.view.showWidgetGenerator(
                    gallery.model.staticData.getDefaultData(),
                    gallery.model.dataTypes
                );
            }
        },

        /**
         * Collect form widget's data
         * @member SiteConfigWidgetGenerator
         * @returns {{
         *      category: string,
         *      collector: {},
         *      $modal: ModalElement,
         *      validate: *,
         *      empty: number
         * }}
         * @private
         */
        _collectFormWidgetData: function _collectFormWidgetData() {

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = this.scope.view.get$modal();

            var inputs = $modal.collectInputFields(),
                validate = inputs.hasClass('validate'),
                empty = 0,
                i = 0, l = inputs.length,
                collector = {}, data;

            for (; i < l; i++) {
                data = inputs[i];
                collector[data.name] = data.value;
                $(data).blur();
                if (data.value.length === 0) empty++;
            }

            collector.visible = true;

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = this.getGalleryModule();

            if (gallery) {

                // Store category key
                var category = this.base.lib.hash.getKeyByValue(
                    gallery.model.dataTypes,
                    collector.category
                );
            }

            // Remove unpermitted attribute
            delete collector.category;

            return {
                category: category,
                collector: collector,
                $modal: $modal,
                validate: validate,
                empty: empty
            };
        },

        /**
         * Define on before send widget's data
         * @member SiteConfigWidgetGenerator
         * @param xhr
         * @param opts
         * @private
         */
        _beforeSendWidgetData: function _beforeSendWidgetData(xhr, opts) {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.controller.scope,
                controller = this.controller,
                data = this.data;

            if (data.validate || data.empty) {

                data.$modal.handleNotification(
                    controller.i18n.t('widget.generation.inputs.validate'),
                    'warning'
                );

                scope.logger.warn(
                    controller.i18n.t('widget.generation.inputs.validate'),
                    xhr, opts
                );

                xhr.abort();

                // Allow to create another one
                controller.stopSendingEventOnApprove(false);
            }

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = controller.getGalleryModule();

            if (gallery && gallery.model.staticData.isExistResource(data.collector.resource)) {

                data.$modal.handleNotification(
                    controller.i18n.t('widget.generation.resource.exist'),
                    'warning'
                );

                scope.logger.warn(
                    controller.i18n.t('widget.generation.resource.exist'),
                    xhr, opts
                );

                xhr.abort();

                // Allow to create another one
                controller.stopSendingEventOnApprove(false);
            }

            if (controller.stopSendingEventOnApprove(true)) {

                data.$modal.handleNotification(
                    controller.i18n.t('widget.generation.ajax.abort'),
                    'warning'
                );

                scope.logger.warn(
                    controller.i18n.t('widget.generation.ajax.abort'),
                    xhr, opts
                );

                xhr.abort();
            }
        },

        /**
         * Define on error send widget's data
         * @member SiteConfigWidgetGenerator
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
         * Generate new widget
         * @member SiteConfigWidgetGenerator
         */
        generateNewWidget: function generateNewWidget() {

            /**
             * Get collector
             * @type {{
             *      category: string,
             *      collector: {},
             *      $modal: ModalElement,
             *      validate: *,
             *      empty: number
             * }}
             */
            var data = this._collectFormWidgetData();

            /**
             * Get create new widget route
             * @type {Routes.resources.createNewWidget|*}
             */
            var route = this.resources.createNewWidget;

            $.ajax({

                url: route[0],
                method: route[1],

                data: this.prepareXhrData({
                    author_widget: data.collector,
                    author_widget_category: {
                        name_index: data.category
                    }
                }),

                beforeSend: this._beforeSendWidgetData.bind({
                    controller: this,
                    data: data
                }),

                error: this._onErrorSendWidgetData.bind({
                    controller: this,
                    data: data
                })

            }).done(
                this.generateNewWidgetCallback.bind(this)
            );
        },

        /**
         * Define Stop Sending Event On Approve
         * @member SiteConfigWidgetGenerator
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

            if ($approve.disabled && disable) {
                return $approve.disabled;
            }

            // Disable approve button
            $approve.disabled = disable;
        },

        /**
         * Define on success handler
         * @member SiteConfigWidgetGenerator
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
        },

        /**
         * Define callback for generate new widget
         * @member SiteConfigWidgetGenerator
         * @param data
         * @param status
         * @param xhr
         */
        generateNewWidgetCallback: function generateNewWidgetCallback(data, status, xhr) {

            this._handleSuccessSendWidgetData(data, status, xhr);

            /**
             * Get $modal
             * @type {ModalElement}
             */
            var $modal = this.scope.view.get$modal(),
                msg = this.i18n.t('widget.generated.ok').
                    replace(/\{1}/, data.name);

            // Show message
            $modal.handleNotification(msg, 'success');

            // Clear form
            $modal.collectInputFields({
                method: 'not',
                value: '[name="category"]'
            }).val('');

            // Clear image preview
            $modal.$.find('img').attr('src', '');
        },

        /**
         * Define widget editor
         * @member SiteConfigWidgetGenerator
         * @param {string} resource
         */
        widgetEditor: function widgetEditor(resource) {

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = this.controller.getGalleryModule(),
                widget;

            if (gallery) {

                /**
                 * Get widget data
                 * @type {{
                 *      name: string,
                 *      description: string,
                 *      thumbnail: string,
                 *      dimensions: {width: number, height: number},
                 *      type: string,
                 *      resource: string
                 * }}
                 */
                widget = gallery.model.staticData.getWidgetData(resource);

                this.view.updateWidgetGenerator(
                    widget,
                    gallery.model.dataTypes
                );
            }
        },

        /**
         * Define update widget data
         * @member SiteConfigWidgetGenerator
         * @returns {boolean}
         */
        updateWidget: function updateWidget() {

            /**
             * Get collector
             * @type {{
             *      category: string,
             *      collector: {},
             *      $modal: ModalElement,
             *      validate: *,
             *      empty: number
             * }}
             */
            var data = this._collectFormWidgetData();

            var update = false,
                widgetData = data.$modal.items,
                collector = data.collector,
                index;

            for (index in collector) {

                // Check if data available
                var isData = collector.hasOwnProperty(index);

                if (isData && widgetData.hasOwnProperty(index)) {

                    if (widgetData[index] !== collector[index]) {

                        update = true;
                        break;
                    }

                } else if (isData && (index === 'width' || index === 'height')) {

                    if ((widgetData.dimensions[index] + '') !== collector[index]) {

                        update = true;
                        break;
                    }
                }
            }

            if (data.category !== widgetData.type) {
                update = true;
            }

            if (!update) {

                this.scope.logger.debug(
                    this.i18n.t('widget.manager.unmodified')
                );

                // Show message
                data.$modal.handleNotification(
                    this.i18n.t('widget.manager.unmodified'),
                    'info'
                );

                return false;
            }

            /**
             * Get update existing widget route
             * @type {Routes.resources.updateExistingWidget|*}
             */
            var route = this.resources.updateExistingWidget;

            $.ajax({

                url: route[0].replace(/\{id}/, widgetData.id),
                method: route[1],

                data: this.prepareXhrData({
                    author_widget: data.collector,
                    author_widget_category: {
                        name_index: data.category
                    }
                }),

                beforeSend: this._beforeSendWidgetData.bind({
                    controller: this,
                    data: data
                }),

                error: this._onErrorSendWidgetData.bind({
                    controller: this,
                    data: data
                })

            }).done(
                this.updateWidgetCallback.bind(this)
            );
        },

        /**
         * Define update widget's data callback
         * @member SiteConfigWidgetGenerator
         * @param data
         * @param status
         * @param xhr
         */
        updateWidgetCallback: function updateWidgetCallback(data, status, xhr) {

            this._handleSuccessSendWidgetData(data, status, xhr);

            /**
             * Get gallery
             * @type {Gallery}
             */
            var gallery = this.getGalleryModule();

            if (gallery) {

                gallery.model.staticData.updateDefaultData(data);
            }

            this.loadWidgetsList();
        }
    });
});