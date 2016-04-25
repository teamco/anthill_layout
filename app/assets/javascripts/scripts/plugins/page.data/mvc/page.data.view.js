/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'plugins/preferences/preferences',
    'element/header.element',
    'element/footer.element',
    'plugins/page.data/element/page.data.content.element',
    'plugins/page.data/element/page.data.element'
], function definePageDataView(AntHill, BaseView, BasePreferencesElement, Header, Footer, PageDataContentElement, PageDataElement) {

    /**
     * Define view
     * @class PageDataView
     * @constructor
     * @extends BaseView
     * @extends BasePreferencesElement
     */
    var PageDataView = function PageDataView() {
    };

    return PageDataView.extend(
        'PageDataView', {

            /**
             * Render PageData
             * @memberOf PageDataView
             * @returns {boolean}
             */
            renderPageData: function renderPageData() {

                if (this.isCached('$pagedata', PageDataElement)) {
                    return false;
                }

                /**
                 * Define PageData element
                 * @type {PageDataElement}
                 */
                this.elements.$pagedata = new PageDataElement(this, {
                    uuid: this.createUUID(),
                    $container: this.get$container().$
                });
            },

            /**
             * Render page.data content
             * @memberOf PageDataView
             * @param data
             * @returns {boolean}
             */
            renderContent: function renderContent(data) {

                this.cleanElementItems();
                this.updateElementItems();

                this.renderFilter(
                    this.updateFooterContent.bind(this)
                );

                for (var index in data) {

                    if (data.hasOwnProperty(index)) {

                        /**
                         * Render item
                         * @type {PageDataContentElement}
                         */
                        var $item = new PageDataContentElement(this, {
                            style: 'content',
                            uuid: [
                                data[index].model.getConfig('uuid'),
                                this.scope.name.toDash()
                            ].join('-'),
                            $container: this.get$item().$,
                            data: data[index]
                        });

                        this.scope.observer.publish(
                            this.scope.eventmanager.eventList.storeItem,
                            data[index]
                        );

                        this.controller.defineContentReferrer(data[index]);

                        this.updateElementItems($item);
                    }
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
             * @memberOf PageDataView
             */
            updateFooterContent: function updateFooterContent() {
                this.renderFooter(Footer, this.get$item());
            },

            /**
             * Show preferences
             * @memberOf PageDataView
             * @param config
             * @param {boolean} load
             */
            showPageDataModal: function showPageDataModal(config, load) {

                /**
                 * Define scope
                 * @type {PageData|{name}}
                 */
                var scope = this.scope;

                /**
                 * Get content
                 * @type {WidgetContent}
                 */
                var content = scope.activeContent;

                if (!content || !load) {
                    scope.logger.warn('Undefined content');
                    return false;
                }

                /**
                 * Define $html
                 * @type {PluginElement}
                 */
                var $html = content.view.renderPreferences();

                this.openPreferences({
                    config: config,
                    $html: $html.$,
                    style: [
                        config.preferences.resource.toClassName(),
                        'widget-prefs preferences'
                    ].join(' '),
                    title: 'Widget preferences',
                    buttons: {
                        remove: {
                            text: 'Remove',
                            type: 'danger',
                            events: {
                                click: 'removeWidget'
                            }
                        },
                        content: {
                            text: 'Show content',
                            type: 'info',
                            events: {
                                click: 'show' + scope.name + 'Content'
                            }
                        },
                        rules: {
                            text: 'Rules',
                            type: 'info',
                            events: {
                                click: 'rules' + scope.name
                            }
                        },
                        reject: {
                            text: 'Cancel',
                            events: {
                                click: [
                                    'rejectModalEvent',
                                    'restoreWidgetsLayerIndex',
                                    'restoreWidgetSticker'
                                ]
                            }
                        }
                    }
                });
            },

            /**
             * Render page.data
             * @memberOf PageDataView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderPageData.bind(this)
                );
            }

        },
        AntHill.prototype,
        BaseView.prototype,
        BasePreferencesElement.prototype
    )
});