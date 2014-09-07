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
        'plugins/site.config/element/site.config.import.file.element',
        'plugins/site.config/element/site.config.approve.import.element',
        'plugins/site.config/element/site.config.element'
    ],

    /**
     * Define SiteConfigView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferences
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {SiteConfigContentElement} SiteConfigContentElement
     * @param {SiteConfigPreferencesElement} SiteConfigPreferencesElement
     * @param {SiteConfigCleanUpElement} SiteConfigCleanUpElement
     * @param {SiteConfigImportFileElement} SiteConfigImportFileElement
     * @param {SiteConfigApproveImportElement} SiteConfigApproveImportElement
     * @param {SiteConfigElement} SiteConfigElement
     * @returns {*}
     */
        function defineSiteConfigView(BaseView, BasePreferences, Header, Footer, SiteConfigContentElement, SiteConfigPreferencesElement, SiteConfigCleanUpElement, SiteConfigImportFileElement, SiteConfigApproveImportElement, SiteConfigElement) {

        /**
         * Define view
         * @class SiteConfigView
         * @extends BaseView
         * @constructor
         */
        var SiteConfigView = function SiteConfigView() {
        };

        return SiteConfigView.extend('SiteConfigView', {

            /**
             * Render SiteConfig
             * @member SiteConfigView
             * @returns {boolean}
             */
            renderSiteConfig: function renderSiteConfig() {

                if (this.isCached('$siteconfig', SiteConfigElement)) {
                    return false;
                }

                this.header(Header, this.elements.$container).setText(
                    'Site Config'
                );

                /**
                 * Define SiteConfig element
                 * @type {SiteConfigElement}
                 */
                this.elements.$siteconfig = new SiteConfigElement(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$siteconfig.getFooter()
                );
            },

            /**
             * Render site.config content
             * @member SiteConfigView
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

                this.footer(Footer, this.elements.$container).setHtml(
                    this.elements.$siteconfig.getFooter()
                );
            },

            /**
             * Show import data
             * @member SiteConfigView
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
                        text: 'Cancel',
                        events: {
                            click: 'rejectModalEvent'
                        }
                    }
                };

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = this.controller.getPage();

                /**
                 * Get Workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace();

                this.modalDialog({
                    style: 'import-site-data',
                    $container: page.view.get$item().$,
                    type: 'info',
                    title: 'Import site data',
                    text: workspace.model.getUUID(),
                    html: $html.$,
                    cover: true,
                    buttons: buttons
                });
            },

            /**
             * Show approve import data
             * @member SiteConfigView
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
                        text: 'Reload',
                        disabled: true,
                        events: {
                            click: 'reloadSiteData'
                        }
                    },
                    confirm: {
                        text: 'Confirm',
                        events: {
                            click: 'approveImportSiteData'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: 'rejectModalEvent'
                        }
                    }
                };

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = this.controller.getPage();

                this.elements.$modal.selfDestroy();

                this.modalDialog({
                    style: 'import-site-data approve',
                    $container: page.view.get$item().$,
                    type: 'warning',
                    title: 'Confirm to Import site data',
                    text: [
                        encodeURIComponent(file.name), ' (', file.type || 'n/a', ') - ', file.size, ' bytes',
                        ' (', file.lastModifiedDate ?
                            file.lastModifiedDate.toLocaleDateString() : 'n/a', ')'
                    ].join(''),
                    html: $html.$,
                    cover: true,
                    buttons: buttons
                });
            },

            /**
             * Show preferences
             * @member SiteConfigView
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
                        text: 'OK',
                        events: {
                            click: 'approveUpdatePreferences'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: ['revertSitePreferences', 'rejectModalEvent']
                        }
                    }
                };

                /**
                 * Define page
                 * @type {Page}
                 */
                var page = this.controller.getPage();

                /**
                 * Get Workspace
                 * @type {Workspace}
                 */
                var workspace = this.controller.getWorkspace();

                this.modalDialog({
                    style: [
                        opts.title.toDash(), 'config'
                    ].join(' '),
                    $container: page.view.get$item().$,
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
             * @member SiteConfigView
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
             * @member SiteConfigView
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
             * @member SiteConfigView
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
             * @member SiteConfigView
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
             * Render cleanup confirmation modal dialog
             * @member SiteConfigView
             */
            cleanUpConfirmation: function cleanUpConfirmation() {

                this.modalDialog({
                    $container: this.controller.getPage().view.elements.$page.$,
                    type: 'warning',
                    title: 'Clean up',
                    text: 'Are you sure want to cleanup browser local storage?',
                    html: this.renderCleanUp().$,
                    cover: true,
                    autoclose: true,
                    buttons: {
                        approve: {
                            text: 'OK',
                            events: {
                                click: 'approveCleanUp'
                            }
                        },
                        reject: {
                            text: 'Cancel',
                            events: {
                                click: 'rejectModalEvent'
                            }
                        }
                    }
                });
            },

            /**
             * Render site.config
             * @member SiteConfigView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderSiteConfig.bind(this)
                );
            }

        }, BaseView.prototype, BasePreferences.prototype)
    }
);