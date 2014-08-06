/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/bar/element/bar.element',
    'plugins/bar/element/bar.content.element'
], function defineBarView(BaseView, Header, Footer, BarElement, BarContentElement) {

    /**
     * Define view
     * @class BarView
     * @constructor
     * @extends BaseView
     */
    var BarView = function BarView() {
    };

    return BarView.extend('BarView', {

        /**
         * Render Bar
         * @member BarView
         */
        renderBar: function renderBar() {

            if (this.isCached('$bar', BarElement)) {
                return false;
            }

            this.header(Header, this.elements.$container);

            /**
             * Define container
             * @type {BarElement}
             */
            this.elements.$bar = new BarElement(this, {
                $container: this.elements.$container.$,
                style: 'panel-bar',
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);
        },

        /**
         * Render bar content
         * @param data
         * @param {Boolean} force
         * @member BarView
         * @returns {boolean}
         */
        renderContent: function renderContent(data, force) {

            if (this.isCachedItems() && !force) {
                return false;
            }

            /**
             * Define content
             * @type {{}}
             */
            this.elements.items = {};

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Define item
                     */
                    var item = data[index];

                    /**
                     * Define module resource
                     * @type {string}
                     */
                    var moduleResource = item.module.constructor.name.toDash();

                    /**
                     * Render item
                     * @type {BarContentElement}
                     */
                    var $item = new BarContentElement(this, {
                        style: [
                            'content',
                            item.activated ? 'activated' : '',
                            moduleResource
                        ].join(' '),
                        resource: item,
                        cname: moduleResource,
                        $container: this.elements.$bar.$
                    });

                    this.elements.items[$item.id] = $item;
                }
            }
        },

        /**
         * Render bar
         * @member BarView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderBar.bind(this)
            );
        }

    }, BaseView.prototype)

});