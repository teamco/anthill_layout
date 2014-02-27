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
    'plugins/bar/element/bar.element',
    'plugins/bar/element/bar.content.element'
], function defineBarView(BaseView, Header, Footer, BarElement, BarContentElement) {

    var View = function View() {
    };

    return View.extend({

        /**
         * Render Bar
         */
        renderBar: function renderBar() {

            if (this.isCached('$bar', BarElement)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define container
             * @type {plugins.panel.element.panel.container.element}
             */
            this.elements.$bar = new BarElement(this, {
                $container: this.elements.$container.$,
                style: 'panel-bar',
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render content container
         */
        renderContentContainer: function renderContentContainer() {
            /**
             * Define Bar element
             * @type {element.page.page.element}
             */
            this.elements.$content = new BarContentContainer(this, {
                $container: this.elements.$bar.$,
                style: 'bar-content'
            });
        },

        /**
         * Render bar content
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
                     * Define item
                     */
                    var item = data[index];

                    /**
                     * Define module path
                     * @type {string}
                     */
                    var modulePath = item.module.constructor.name.toLowerCase();

                    /**
                     * Render item
                     * @type {plugins.bar.element.bar.content.element}
                     */
                    var $item = new BarContentElement(this, {
                        style: [
                            'content',
                            item.activated ? 'activated' : '',
                            modulePath
                        ].join(' '),
                        path: modulePath,
                        $container: this.elements.$bar.$
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render bar
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderBar.bind(this)
            );
        }

    }, BaseView.prototype)

});