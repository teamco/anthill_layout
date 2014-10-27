/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define(
    [
        'plugins/plugin',
        'plugins/preferences/preferences.controller'
    ],

    /**
     * Define SiteConfigController
     * @param {PluginController} PluginBase
     * @param {PreferencesController} PreferencesController
     * @returns {SiteConfigController}
     */
    function defineSiteConfigController(PluginBase, PreferencesController) {

        /**
         * Define site config controller
         * @class SiteConfigController
         * @extends PluginController
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
                            gallery.model.staticData.getDefaultData()
                        );
                    }
                }

            },

            PluginBase.prototype,
            PreferencesController.prototype
        );
    }
);