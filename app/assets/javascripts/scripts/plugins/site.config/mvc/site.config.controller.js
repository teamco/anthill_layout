/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'plugins/plugin',
        'config/routes',
        'plugins/preferences/preferences.controller'
    ],

    /**
     * Define SiteConfigController
     * @param {PluginController} PluginBase
     * @param {PreferencesController} PreferencesController
     * @param {Routes} Routes
     * @returns {SiteConfigController}
     */
        function defineSiteConfigController(PluginBase, Routes, PreferencesController) {

        /**
         * Define site config controller
         * @class SiteConfigController
         * @extends PluginController
         * @extends Routes
         * @extends PreferencesController
         * @constructor
         */
        var SiteConfigController = function SiteConfigController() {

        };

        return SiteConfigController.extend(
            'SiteConfigController',
            {

                /**
                 * Get data
                 * @member SiteConfigController
                 * @returns {*}
                 */
                getData: function getData() {
                    return this.model.getDataItems(
                        this.getWorkspace()
                    );
                },

                /**
                 * Load site content
                 * @member SiteConfigController
                 * @param opened
                 */
                loadContent: function loadContent(opened) {
                    if (opened) {
                        this.getView().renderContent(
                            this.getData()
                        );
                    }
                },

                /**
                 * Load preferences
                 * @member SiteConfigController
                 * @param data
                 */
                loadSitePreferences: function loadSitePreferences(data) {
                    this.view.showPreferences(
                        data,
                        this.model.getSiteWidthRange()
                    );
                },

                /**
                 * Get Prefs
                 * @member SiteConfigController
                 * @returns {SiteConfigModel.preferences}
                 */
                getPreferences: function getPreferences() {
                    return this.model.preferences;
                },

                /**
                 * Approve update preferences
                 * @member SiteConfigController
                 */
                approveUpdatePreferences: function approveUpdatePreferences() {

                    /**
                     * Define scope
                     * @type {SitePreferences}
                     */
                    var scope = this.scope,
                        workspace = scope.controller.getWorkspace();

                    workspace.controller.updatePreferences(
                        scope.view.elements.$modal,
                        false
                    );
                },

                /**
                 * Revert preferences on cancel
                 * @member SiteConfigController
                 */
                revertSitePreferences: function revertSitePreferences() {

                    /**
                     * Define workspace
                     * @type {Workspace}
                     */
                    var workspace = this.getWorkspace();

                    workspace.observer.publish(
                        workspace.eventmanager.eventList.updateSiteWidth
                    );
                },

                /**
                 * Clean up local storage
                 * @member SiteConfigController
                 */
                cleanUpLocalStorage: function cleanUpLocalStorage() {
                    this.view.cleanUpConfirmation();
                },

                /**
                 * Import site data
                 * @member SiteConfigController
                 */
                importSiteData: function importSiteData() {
                    this.view.showImportData();
                },

                /**
                 * Approve import site data
                 * @member SiteConfigController
                 */
                approveImportSiteData: function approveImportSiteData() {

                    /**
                     * Get scope
                     * @type {SiteConfig}
                     */
                    var scope = this.scope;

                    /**
                     * Get view elements
                     * @type {SiteConfigView.elements}
                     */
                    var elements = scope.view.elements;

                    /**
                     * Get $modal
                     * @type {ModalElement}
                     */
                    var $modal = scope.view.get$modal();

                    if (!$modal || $modal.$buttons.confirm.disabled) {
                        return false;
                    }

                    this.root().model.setting.importData(elements.$import.data);

                    $modal.$buttons.reload.enable();
                    $modal.$buttons.confirm.disable();
                    $modal.$buttons.reject.destroy();
                    $modal.$buttons.closeX.destroy();
                },

                /**
                 * Ready to import site data
                 * @member SiteConfigController
                 * @param {object} json
                 * @param {FileList} file
                 */
                readyToImportSiteData: function readyToImportSiteData(json, file) {
                    this.view.showApproveImportData(json, file);
                },

                /**
                 * Reload site data
                 * @member SiteConfigController
                 */
                reloadSiteData: function reloadSiteData() {

                    /**
                     * Get $modal
                     * @type {ModalElement}
                     */
                    var $modal = this.scope.view.get$modal();

                    if (!$modal || $modal.$buttons.reload.disabled) {
                        return false;
                    }

                    document.location.reload(true);
                },

                /**
                 * Export site data
                 * @member SiteConfigController
                 */
                exportSiteData: function exportSiteData() {

                    /**
                     * Get root
                     * @type {App}
                     */
                    var root = this.controller.root(),
                        setting = root.model.setting,
                        ns = setting.getNameSpace();

                    root.view.renderExportLink({
                        type: 'text/json',
                        fileName: 'data.json',
                        content: JSON.stringify(
                            setting.decompress(
                                setting.getStorage()[ns]
                            )
                        ),
                        title: 'Export JSON',
                        autoload: true
                    });
                },

                /**
                 * Approve clean up
                 * @member SiteConfigController
                 */
                approveCleanUp: function approveCleanUp() {

                    /**
                     * Define scope
                     * @member SiteConfig
                     */
                    var scope = this.scope,
                        $modal = scope.view.elements.$modal;

                    if (scope.base.isDefined($modal)) {
                        $modal.selfDestroy();
                    }

                    this.root().model.setting.clear();

                    // Reload without cache
                    document.location.reload(true);
                },

                /**
                 * Define widget generator
                 * @member SiteConfigController
                 */
                widgetGenerator: function widgetGenerator() {

                    /**
                     * Get gallery
                     * @type {Gallery}
                     */
                    var gallery = this.controller.getGalleryModule();

                    if (gallery) {
                        this.view.showWidgetsList(
                            gallery.model.staticData.getDefaultData(), [
                                'name', 'thumbnail', 'resource'
                            ]
                        );
                    }
                },

                /**
                 * Define create widget step
                 * @member SiteConfigController
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
                 * Generate new widget
                 * @member SiteConfigController
                 */
                generateNewWidget: function generateNewWidget() {

                    var inputs = this.scope.view.get$modal().collectInputFields(),
                        i = 0, l = inputs.length,
                        collector = {}, data;

                    for (; i < l; i++) {
                        data = inputs[i];
                        collector[data.name] = data.value;
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

                    /**
                     * Get $modal
                     * @type {ModalElement}
                     */
                    var $modal = this.scope.view.get$modal();

                    $.ajax({

                        url: this.resources.createNewWidget,
                        method: 'post',

                        data: this.prepareXhrData({
                            author_widget: collector,
                            author_widget_category: {
                                name_index: category
                            }
                        }),

                        beforeSend: function (xhr, opts) {

                            if (this.stopSendingEventOnApprove(true)) {

                                $modal.handleNotification(
                                    this.i18n.t('widget.generation.ajax.drop'),
                                    'warning'
                                );

                                this.scope.logger.warn(
                                    this.i18n.t('widget.generation.ajax.drop'),
                                    xhr, opts
                                );

                                xhr.abort();

                                return false;
                            }

                        }.bind(this),

                        error: function (xhr, status, description) {

                            // Call super
                            $.ajaxSettings.error.call(this, arguments);

                            $modal.handleNotification(description, 'error');
                        }

                    }).done(
                        this.generateNewWidgetCallback.bind(this)
                    );
                },

                /**
                 * Define Stop Sending Event On Approve
                 * @member SiteConfigController
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
                 * Define callback for generate new widget
                 * @member SiteConfigController
                 * @param data
                 * @param status
                 * @param xhr
                 */
                generateNewWidgetCallback: function generateNewWidgetCallback(data, status, xhr) {

                    /**
                     * Get scope
                     * @type {SiteConfig}
                     */
                    var scope = this.scope,
                        msg = this.i18n.t('widget.generated.ok').replace(/\{1\}/, data.name);

                    scope.logger.debug(msg, arguments);

                    // Allow to create another one
                    this.stopSendingEventOnApprove(false);

                    /**
                     * Get $modal
                     * @type {ModalElement}
                     */
                    var $modal = scope.view.get$modal();

                    // Show message
                    $modal.handleNotification(msg, 'success');

                    // Clear form
                    $modal.collectInputFields().val('');
                }
            },

            PluginBase.prototype,
            Routes.prototype,
            PreferencesController.prototype
        );
    }
);