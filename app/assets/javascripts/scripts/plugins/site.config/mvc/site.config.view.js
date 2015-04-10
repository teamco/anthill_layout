/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'modules/View',
        'plugins/preferences/preferences',
        'element/header.element',
        'element/footer.element',
        'plugins/site.config/element/site.config.content.element',
        'plugins/site.config/element/site.config.preferences.element',
        'plugins/site.config/element/site.config.cleanup.element',
        'plugins/site.config/element/site.config.activate.element',
        'plugins/site.config/element/site.config.import.file.element',
        'plugins/site.config/element/site.config.approve.import.element',
        'plugins/site.config/element/site.config.widgets.list.element',
        'plugins/site.config/element/site.config.element'
    ],

    /**
     * Define SiteConfigView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferencesElement
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {SiteConfigContentElement} SiteConfigContentElement
     * @param {SiteConfigPreferencesElement} SiteConfigPreferencesElement
     * @param {SiteConfigCleanUpElement} SiteConfigCleanUpElement
     * @param {SiteConfigActivateElement} SiteConfigActivateElement
     * @param {SiteConfigImportFileElement} SiteConfigImportFileElement
     * @param {SiteConfigApproveImportElement} SiteConfigApproveImportElement
     * @param {SiteConfigWidgetsListElement} SiteConfigWidgetsListElement
     * @param {SiteConfigElement} SiteConfigElement
     * @returns {*}
     */
    function defineSiteConfigView(BaseView, BasePreferencesElement, Header, Footer, SiteConfigContentElement, SiteConfigPreferencesElement, SiteConfigCleanUpElement, SiteConfigActivateElement, SiteConfigImportFileElement, SiteConfigApproveImportElement, SiteConfigWidgetsListElement, SiteConfigElement) {

        /**
         * Define view
         * @class SiteConfigView
         * @extends BaseView
         * @constructor
         */
        var SiteConfigView = function SiteConfigView() {
        };

        return SiteConfigView.extend(
            'SiteConfigView', {

                /**
                 * Render SiteConfig
                 * @memberOf SiteConfigView
                 * @returns {boolean}
                 */
                renderSiteConfig: function renderSiteConfig() {

                    this.renderHeader(Header, this.i18n.t('site.data.config'));

                    this.renderFilter(
                        this.updateFooterContent.bind(this)
                    );

                    if (!this.isCached('$siteconfig', SiteConfigElement)) {

                        /**
                         * Define SiteConfig element
                         * @type {SiteConfigElement}
                         */
                        this.elements.$siteconfig = new SiteConfigElement(this, {
                            id: this.createUUID(),
                            $container: this.elements.$container.$
                        });
                    }

                    this.updateFooterContent();
                },

                /**
                 * Render site.config content
                 * @memberOf SiteConfigView
                 * @param data
                 * @returns {boolean}
                 */
                renderContent: function renderContent(data) {

                    /**
                     * Define content
                     * @type {{}}
                     */
                    this.elements.items = {};
                    this.elements.$siteconfig.empty();

                    var index, counter = 1;

                    for (index in data) {

                        if (data.hasOwnProperty(index)) {

                            /**
                             * Render item
                             * @type {SiteConfigContentElement}
                             */
                            var $item = new SiteConfigContentElement(this, {
                                style: [
                                    'content',
                                    data[index].title.toClassName()
                                ].join(' '),
                                $container: this.elements.$siteconfig.$,
                                counter: counter,
                                data: data[index]
                            });

                            counter += 1;

                            this.elements.items[$item.id] = $item;
                        }
                    }

                    this.elements.$siteconfig.scrollCover(
                        this.elements.$container.$
                    );

                    this.elements.$filter.updateData({
                        items: this.elements.items,
                        focusOn: 'input'
                    });

                    this.updateFooterContent();
                },

                /**
                 * Update footer content
                 * @memberOf SiteConfigView
                 */
                updateFooterContent: function updateFooterContent() {
                    this.renderFooter(Footer, this.elements.$siteconfig);
                },

                /**
                 * Show import data
                 * @memberOf SiteConfigView
                 */
                showImportData: function showImportData() {

                    /**
                     * Define $html
                     * @type {SiteConfigImportFileElement}
                     */
                    var $html = this.renderImportData();

                    /**
                     * Define buttons
                     * @type {*}
                     */
                    var buttons = {
                        reject: {
                            text: this.i18n.t('site.data.cancel'),
                            events: {
                                click: 'rejectModalEvent'
                            }
                        }
                    };

                    /**
                     * Get Workspace
                     * @type {Workspace}
                     */
                    var workspace = this.controller.getWorkspace();

                    this.modalDialog({
                        style: 'import-site-data upload-json',
                        type: 'info',
                        title: this.i18n.t('import.site.data'),
                        text: workspace.model.getUUID(),
                        html: $html.$,
                        cover: true,
                        buttons: buttons
                    });
                },

                /**
                 * Show approve import data
                 * @memberOf SiteConfigView
                 * @param {object} json
                 * @param {File} file
                 */
                showApproveImportData: function showApproveImportData(json, file) {

                    /**
                     * Define $html
                     * @type {SiteConfigApproveImportElement}
                     */
                    var $html = this.renderApproveImportData(json);

                    /**
                     * Define buttons
                     * @type {*}
                     */
                    var buttons = {
                        reload: {
                            text: this.i18n.t('import.site.data.confirm.reload'),
                            disabled: true,
                            events: {
                                click: 'reloadSiteData'
                            }
                        },
                        confirm: {
                            text: this.i18n.t('site.data.confirm'),
                            events: {
                                click: 'approveImportSiteData'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.cancel'),
                            events: {
                                click: 'rejectModalEvent'
                            }
                        }
                    };

                    this.elements.$modal.selfDestroy();

                    this.modalDialog({
                        style: 'import-site-data approve',
                        type: 'warning',
                        title: this.i18n.t('import.site.data.confirm'),
                        text: [
                            encodeURIComponent(file.name),
                            ' (', file.type || 'n/a', '), ',
                            this.scope.base.lib.number.bytes2Size(file.size)
                        ].join(''),
                        html: $html.$,
                        cover: true,
                        buttons: buttons
                    });
                },

                /**
                 * Show preferences
                 * @memberOf SiteConfigView
                 * @param opts
                 * @param map
                 */
                showPreferences: function showPreferences(opts, map) {

                    /**
                     * Define $html
                     * @type {SiteConfigPreferencesElement}
                     */
                    var $html = this.renderPreferences(map);

                    /**
                     * Define buttons
                     * @type {*}
                     */
                    var buttons = {
                        approve: {
                            text: this.i18n.t('site.data.save'),
                            events: {
                                click: 'approveUpdatePreferences'
                            }
                        },
                        reject: {
                            text: this.i18n.t('site.data.cancel'),
                            events: {
                                click: ['revertSitePreferences', 'rejectModalEvent']
                            }
                        }
                    };

                    /**
                     * Get Workspace
                     * @type {Workspace}
                     */
                    var workspace = this.controller.getWorkspace();

                    this.modalDialog({
                        style: [
                            opts.title.toDash(), 'site-config'
                        ].join(' '),
                        type: 'info',
                        title: opts.title,
                        text: workspace.model.getUUID(),
                        html: $html.$,
                        cover: true,
                        buttons: buttons
                    });
                },

                /**
                 * Render import file element
                 * @memberOf SiteConfigView
                 * @returns {SiteConfigImportFileElement}
                 */
                renderImportData: function renderImportData() {

                    /**
                     * Define SiteConfig ImportFile Element
                     * @type {SiteConfigImportFileElement|SiteConfigApproveImportElement}
                     */
                    this.elements.$import = new SiteConfigImportFileElement(this, {});

                    return this.elements.$import;
                },

                /**
                 * Render approve import file element
                 * @memberOf SiteConfigView
                 * @returns {SiteConfigApproveImportElement}
                 */
                renderApproveImportData: function renderApproveImportData(json) {

                    /**
                     * Define SiteConfig Approve Import Element
                     * @type {SiteConfigApproveImportElement}
                     */
                    this.elements.$import = new SiteConfigApproveImportElement(this, {
                        data: json
                    });

                    return this.elements.$import;
                },

                /**
                 * Render Prefs
                 * @memberOf SiteConfigView
                 * @param map
                 * @returns {SiteConfigPreferencesElement}
                 */
                renderPreferences: function renderPreferences(map) {

                    /**
                     * Define SiteConfig Preferences Element
                     * @type {SiteConfigPreferencesElement}
                     */
                    this.elements.$preferences = new SiteConfigPreferencesElement(this, {
                        map: map
                    });

                    return this.elements.$preferences;
                },

                /**
                 * Render cleanup element
                 * @memberOf SiteConfigView
                 * @returns {SiteConfigCleanUpElement}
                 */
                renderCleanUp: function renderCleanUp() {

                    /**
                     * Define SiteConfig CleanUp Element
                     * @type {SiteConfigCleanUpElement}
                     */
                    this.elements.$cleanup = new SiteConfigCleanUpElement(this, {});

                    return this.elements.$cleanup;
                },

                /**
                 * Render activate element
                 * @memberOf SiteConfigView
                 * @returns {SiteConfigActivateElement}
                 */
                renderActivate: function renderActivate() {

                    /**
                     * Define SiteConfig Activate Element
                     * @type {SiteConfigActivateElement}
                     */
                    this.elements.$activate = new SiteConfigActivateElement(this, {});

                    return this.elements.$activate;
                },

                /**
                 * Render cleanup confirmation modal dialog
                 * @memberOf SiteConfigView
                 */
                cleanUpConfirmation: function cleanUpConfirmation() {

                    this.modalDialog({
                        style: 'clean-up-data',
                        type: 'warning',
                        title: 'Clean up',
                        text: 'Are you sure want to cleanup browser local storage?',
                        html: this.renderCleanUp().$,
                        cover: true,
                        autoclose: true,
                        buttons: {
                            approve: {
                                text: this.i18n.t('site.data.confirm'),
                                events: {
                                    click: 'approveCleanUp'
                                }
                            },
                            reject: {
                                text: this.i18n.t('site.data.cancel'),
                                events: {
                                    click: 'rejectModalEvent'
                                }
                            }
                        }
                    });
                },

                /**
                 * Render activate confirmation modal dialog
                 * @memberOf SiteConfigView
                 */
                activateConfirmation: function activateConfirmation() {

                    /**
                     * Get root
                     * @type {Application}
                     */
                    var root = this.controller.root();

                    this.modalDialog({
                        style: 'activate',
                        type: 'warning',
                        title: 'Activate',
                        text: [
                            'Are you sure want to activate current version: ',
                            root.model.getConfig('version'), '?'
                        ].join(''),
                        html: this.renderActivate().$,
                        cover: true,
                        autoclose: true,
                        buttons: {
                            approve: {
                                text: this.i18n.t('site.data.confirm'),
                                events: {
                                    click: 'approveActivate'
                                }
                            },
                            reject: {
                                text: this.i18n.t('site.data.cancel'),
                                events: {
                                    click: 'rejectModalEvent'
                                }
                            }
                        }
                    });
                },

                /**
                 * Render widgets manager
                 * @memberOf SiteConfigView
                 */
                renderWidgetsManager: function renderWidgetsManager() {

                    /**
                     * Define SiteConfig Widgets list Element
                     * @type {SiteConfigWidgetsListElement}
                     */
                    this.elements.$widgetgenerator = new SiteConfigWidgetsListElement(this, {});

                    return this.elements.$widgetgenerator;
                },

                /**
                 * Define show widgets list
                 * @memberOf SiteConfigView
                 * @param {Array} widgets
                 * @param {Array} show
                 */
                showWidgetsList: function showWidgetsList(widgets, show) {

                    if (this.elements.$modal) {

                        // Clear modal
                        this.elements.$modal.selfDestroy();
                    }

                    this.modalDialog({
                        style: 'widget-list',
                        type: 'info',
                        title: this.i18n.t('widget.manager.list').replace(/\{1}/, widgets.length + ''),
                        html: this.renderWidgetsManager().renderWidgetsList(widgets, show),
                        cover: true,
                        autoclose: false,
                        buttons: {
                            approve: {
                                text: this.i18n.t('widget.manager.generate'),
                                events: {
                                    click: 'nextWidgetGenerator'
                                }
                            },
                            reject: {
                                text: this.i18n.t('site.data.cancel'),
                                events: {
                                    click: 'rejectModalEvent'
                                }
                            }
                        }
                    });
                },

                /**
                 * Define show widgets generator
                 * @memberOf SiteConfigView
                 * @param {Array} widgets
                 * @param {Array} types
                 * @param {object} defaults
                 */
                showWidgetGenerator: function showWidgetGenerator(widgets, types, defaults) {

                    if (this.elements.$modal) {

                        // Clear modal
                        this.elements.$modal.selfDestroy();
                    }

                    this.modalDialog({
                        style: 'widget-generator-new',
                        type: 'info',
                        title: this.i18n.t('widget.manager.generate.new'),
                        html: this.elements.$widgetgenerator.renderWidgetGeneratorForm(
                            widgets,
                            types,
                            defaults,
                            true
                        ),
                        cover: true,
                        closeX: false,
                        autoclose: false,
                        buttons: {
                            approve: {
                                text: this.i18n.t('site.data.save'),
                                events: {
                                    click: 'generateNewWidget'
                                }
                            },
                            reject: {
                                text: this.i18n.t('site.data.back'),
                                events: {
                                    click: 'loadWidgetsList'
                                }
                            }
                        }
                    });
                },

                /**
                 * Define update widget generator
                 * @memberOf SiteConfigView
                 * @param {object} widget
                 * @param {Array} types
                 */
                updateWidgetGenerator: function updateWidgetGenerator(widget, types) {

                    if (this.elements.$modal) {

                        // Clear modal
                        this.elements.$modal.selfDestroy();
                    }

                    this.modalDialog({
                        style: 'widget-generator-new widget-generator-edit',
                        type: 'info',
                        title: this.i18n.t('widget.manager.generate.update') + ': ' + widget.name,
                        html: this.elements.$widgetgenerator.renderWidgetGeneratorForm(
                            widget,
                            types,
                            widget,
                            false
                        ),
                        cover: true,
                        closeX: false,
                        autoclose: false,
                        items: widget,
                        buttons: {
                            approve: {
                                text: this.i18n.t('site.data.save'),
                                events: {
                                    click: 'updateWidget'
                                }
                            },
                            reject: {
                                text: this.i18n.t('site.data.back'),
                                events: {
                                    click: 'loadWidgetsList'
                                }
                            }
                        }
                    });
                },

                /**
                 * Render site.config
                 * @memberOf SiteConfigView
                 */
                render: function render() {

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.successRendered,
                        this.renderSiteConfig.bind(this)
                    );
                }

            },
            BaseView.prototype,
            BasePreferencesElement.prototype
        )
    }
);