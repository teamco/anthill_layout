/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'plugins/preferences/preferences',
    'element/header.element',
    'element/footer.element',
    'plugins/workspace.data/element/workspace.data.content.element',
    'plugins/workspace.data/element/workspace.data.preferences.element',
    'plugins/workspace.data/element/workspace.data.element'
], function defineWorkspaceDataView(BaseView, BasePreferences, Header, Footer, WorkspaceDataContent, WorkspaceDataPreferencesElement, WorkspaceData) {

    /**
     * Define view
     * @class WorkspaceDataView
     * @extends BaseView
     * @constructor
     */
    var WorkspaceDataView = function WorkspaceDataView() {
    };

    return WorkspaceDataView.extend('WorkspaceDataView', {

        /**
         * Render WorkspaceData
         * @member WorkspaceDataView
         * @returns {boolean}
         */
        renderWorkspaceData: function renderWorkspaceData() {

            if (this.isCached('$workspace.data', WorkspaceData)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Workspace WorkspaceData'
            );

            /**
             * Define WorkspaceData element
             * @type {WorkspaceDataElement}
             */
            this.elements.$workspace.data = new WorkspaceData(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$workspace.data.getFooter()
            );
        },

        /**
         * Render workspace.data content
         * @member WorkspaceDataView
         * @param data
         * @param {Boolean} force
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            if (this.isCachedItems(force)) {
                return false;
            }

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};

            var index;

            for (index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {*}
                     */
                    var $item = new WorkspaceDataContent(this, {
                        style: 'content',
                        id: data[index].model.getConfig('uuid') + '-workspace.data-view',
                        $container: this.elements.$workspace.data.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Show preferences
         * @member WorkspaceDataView
         * @param config
         */
        showPreferences: function showPreferences(config) {

            /**
             * Define scope
             * @type {WorkspaceData}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            this.openPreferences({
                config: config,
                $html: this.controller.definePreferences(config.uuid).$,
                style: 'workspace.data-prefs preferences',
                title: 'Page preferences'
            });
        },

        /**
         * Render Prefs
         * @member WorkspaceDataView
         * @param {Page} page
         * @returns {WorkspaceDataPreferencesElement}
         */
        renderPreferences: function renderPreferences(page) {

            /**
             * Define WorkspaceData Preferences Element
             * @type {WorkspaceDataPreferencesElement}
             */
            this.elements.$preferences = new WorkspaceDataPreferencesElement(this, {
                data: this.controller.getPreferences(),
                page: page
            });

            return this.elements.$preferences;
        },

        /**
         * Render workspace.data
         * @member WorkspaceDataView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderWorkspaceData.bind(this)
            );
        }

    }, BaseView.prototype, BasePreferences.prototype)

});