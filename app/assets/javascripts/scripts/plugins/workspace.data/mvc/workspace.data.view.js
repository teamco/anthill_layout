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
        'plugins/workspace.data/element/workspace.data.content.element',
        'plugins/workspace.data/element/workspace.data.preferences.element',
        'plugins/workspace.data/element/workspace.data.add.page.element',
        'plugins/workspace.data/element/workspace.data.element'
    ],

    /**
     * Define WorkspaceDataView
     * @param {BaseView} BaseView
     * @param {BasePreferences} BasePreferencesElement
     * @param {BaseView} Header
     * @param {BaseView} Footer
     * @param {WorkspaceDataContentElement} WorkspaceDataContentElement
     * @param {WorkspaceDataPreferencesElement} WorkspaceDataPreferencesElement
     * @param {WorkspaceDataAddPageElement} WorkspaceDataAddPageElement
     * @param {WorkspaceDataElement} WorkspaceDataElement
     * @returns {*}
     */
    function defineWorkspaceDataView(BaseView, BasePreferencesElement, Header, Footer, WorkspaceDataContentElement, WorkspaceDataPreferencesElement, WorkspaceDataAddPageElement, WorkspaceDataElement) {

        /**
         * Define view
         * @class WorkspaceDataView
         * @extends BaseView
         * @extends BasePreferencesElement
         * @constructor
         */
        var WorkspaceDataView = function WorkspaceDataView() {
        };

        return WorkspaceDataView.extend(
            'WorkspaceDataView', {

                /**
                 * Render WorkspaceData
                 * @memberOf WorkspaceDataView
                 * @returns {boolean}
                 */
                renderWorkspaceData: function renderWorkspaceData() {

                    if (this.isCached('$workspacedata', WorkspaceDataElement)) {
                        return false;
                    }

                    /**
                     * Define WorkspaceData element
                     * @type {WorkspaceDataElement}
                     */
                    this.elements.$workspacedata = new WorkspaceDataElement(this, {
                        uuid: this.createUUID(),
                        $container: this.get$container().$
                    });
                },

                /**
                 * Render workspace.data content
                 * @memberOf WorkspaceDataView
                 * @param data
                 * @returns {boolean}
                 */
                renderContent: function renderContent(data) {

                    this.cleanElementItems();
                    this.updateElementItems();
                    
                    this.renderCreatePage();

                    this.renderFilter(
                        this.updateFooterContent.bind(this)
                    );

                    /**
                     * Get current page
                     * @type {Page}
                     */
                    var page = this.controller.getPage();

                    var i = 0, l = data.length,
                        show, current;

                    for (i; i < l; i++) {

                        if (!data[i]) {
                            this.scope.logger.warn('Undefined item', data, i);
                            return false;
                        }

                        /**
                         * Show in tabs
                         * @type {string}
                         */
                        show = this.controller.checkShowInTabs(data[i]) ? '' : ' hide';

                        /**
                         * Define current page style
                         * @type {string}
                         */
                        current = page === data[i] ? ' current' : '';

                        /**
                         * Render item
                         * @type {WorkspaceDataContentElement}
                         */
                        var $item = new WorkspaceDataContentElement(this, {
                            style: 'page content' + current + show,
                            uuid: [
                                data[i].model.getUUID(),
                                'workspace-data-view'
                            ].join('-'),
                            $container: this.get$item().$,
                            data: data[i],
                            counter: i + 1
                        });

                        this.updateElementItems($item);
                    }

                    this.updateScrollCover();

                    this.elements.$filter.updateData({
                        items: this.elements.items,
                        focusOn: 'input'
                    });

                    this.updateFooterContent();
                },

                /**
                 * Update footer content
                 * @memberOf WorkspaceDataView
                 */
                updateFooterContent: function updateFooterContent() {
                    this.renderFooter(Footer, this.get$item());
                },

                /**
                 * Render create new page
                 * @memberOf WorkspaceDataView
                 */
                renderCreatePage: function renderCreatePage() {

                    /**
                     * Render add new pages
                     * @type {WorkspaceDataAddPageElement}
                     */
                    this.elements.$addPage = new WorkspaceDataAddPageElement(this, {
                        style: 'add-page',
                        $container: this.get$item().$,
                        events: {
                            click: ['prepareCreatePage']
                        }
                    });
                },

                /**
                 * Render create page wizard
                 * @memberOf WorkspaceDataView
                 * @param {{
                 *      workspace: Workspace,
                 *      style: string,
                 *      [type]: string,
                 *      title: string,
                 *      text: string,
                 *      $html
                 * }} opts
                 */
                renderCreatePageWizard: function renderCreatePageWizard(opts) {

                    /**
                     * Define buttons
                     * @type {{
                     *      approve: {text: string, events: {click: string}},
                     *      reject: {text: string, events: {click: string[]}}
                     * }}
                     */
                    var buttons = {
                        approve: {
                            text: 'OK',
                            type: 'success',
                            events: {
                                click: 'approveCreatePage'
                            }
                        },
                        reject: {
                            text: 'Cancel',
                            events: {
                                click: ['rejectModalEvent']
                            }
                        }
                    };

                    this.modalDialog({
                        style: opts.style,
                        type: opts.type || 'info',
                        title: opts.title,
                        text: opts.workspace.model.getUUID(),
                        html: opts.$html,
                        cover: true,
                        buttons: buttons
                    });
                },

                /**
                 * Show preferences
                 * @memberOf WorkspaceDataView
                 * @param config
                 * @param {boolean} current
                 */
                showPreferences: function showPreferences(config, current) {

                    this.openPreferences({
                        config: config,
                        current: current,
                        $html: this.controller.definePreferences(config.uuid).$,
                        style: 'workspace-data-prefs preferences',
                        title: 'Page preferences',
                        buttons: {
                            destroyPageWidgets: {
                                text: 'Destroy widgets',
                                type: 'danger',
                                events: {
                                    click: 'destroyPageWidgets'
                                }
                            }
                        }
                    });
                },

                /**
                 * Render Prefs
                 * @memberOf WorkspaceDataView
                 * @param {Page} page
                 * @returns {WorkspaceDataPreferencesElement}
                 */
                renderPreferences: function renderPreferences(page) {

                    /**
                     * Define WorkspaceData Preferences Element
                     * @type {WorkspaceDataPreferencesElement}
                     */
                    this.elements.$preferences = new WorkspaceDataPreferencesElement(this, {
                        data: page.model.getConfig('preferences'),
                        page: page
                    });

                    return this.get$preferences();
                },

                /**
                 * Render workspace.data
                 * @memberOf WorkspaceDataView
                 */
                render: function render() {

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.successRendered,
                        this.renderWorkspaceData.bind(this)
                    );
                }

            },
            BaseView.prototype,
            BasePreferencesElement.prototype
        )
    }
);