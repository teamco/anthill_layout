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
    'plugins/panel/element/panel.tab.element',
    'plugins/panel/element/panel.element'
], function definePanelView(BaseView, Header, Footer, PanelContainer, PanelContent, PanelTab, Panel) {

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
                style: 'tab'
            });
        },

        /**
         * Render Panel
         */
        renderPanel: function renderPanel() {

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

            this.renderTab();
            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render panel content
         */
        renderContent: function renderContent(data) {
                               debugger
            /**
             * Define content
             * @type {{}}
             */
            this.elements.content = {};

            var index;

            for (index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {plugins.panel.element.panel.content.element}
                     */
                    var $item = new PanelContent(this, {
                        style: 'content',
                        $container: this.elements.$panel.$,
                        data: data[index]
                    });

                    this.elements.content[$item.id] = $item;
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