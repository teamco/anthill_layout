/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/panel/element/panel.container.element',
    'plugins/panel/element/panel.content.element',
    'plugins/panel/element/panel.content.container.element',
    'plugins/panel/element/panel.tab.element',
    'plugins/panel/element/panel.bar.element',
    'plugins/panel/element/panel.element'
], function definePanelView(BaseView, Header, Footer, PanelContainer, PanelContent, PanelContentContainer, PanelTab, PanelBar, Panel) {

    var View = function View() {
    };

    return View.extend({

        /**
         * Render container
         */
        renderPanelContainer: function renderPanelContainer() {

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$container = new PanelContainer(this, {
                $container: 'body',
                style: 'panel-container'
            });
        },

        /**
         * Render tab to open/close panel
         */
        renderTab: function renderTab() {

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$tab = new PanelTab(this, {
                $container: this.elements.$container.$,
                style: 'panel-tab'
            });
        },

        /**
         * Render tab to open/close panel
         */
        renderBar: function renderBar() {

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$bar = new PanelBar(this, {
                $container: this.elements.$container.$,
                style: 'panel-bar'
            });
        },

        /**
         * Render Panel
         */
        renderPanel: function renderPanel() {

            if (this.isCached('$panel', Panel)) {
                return false;
            }

            this.renderPanelContainer();

            this.header(Header, this.elements.$container);

            /**
             * Define local width
             */
            var width = this.getConfigHTML().width;

            /**
             * Define Panel element
             * @type {element.page.page.element}
             */
            this.elements.$panel = new Panel(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$,
                maxWidth: width.max,
                minWidth: width.min
            });

            this.renderContentContainer();

            this.renderTab();
            this.renderBar();

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render content container
         */
        renderContentContainer: function renderContentContainer() {
            /**
             * Define Panel element
             * @type {element.page.page.element}
             */
            this.elements.$content = new PanelContentContainer(this, {
                $container: this.elements.$panel.$,
                style: 'panel-content'
            });
        },

        /**
         * Render panel content
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
                     * @type {plugins.panel.element.panel.content.element}
                     */
                    var $item = new PanelContent(this, {
                        style: 'content',
                        $container: this.elements.$content.$,
                        data: data[index]
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render panel
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderPanel.bind(this)
            );
        }

    }, BaseView.prototype)

});