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
    'plugins/maximize/element/maximize.content.element',
    'plugins/maximize/element/maximize.element'
], function defineMaximizeView(AntHill, BaseView, BasePreferencesElement, Header, Footer, MaximizeContentElement, MaximizeElement) {

    /**
     * Define view
     * @class MaximizeView
     * @constructor
     * @extends BaseView
     * @extends BasePreferencesElement
     */
    var MaximizeView = function MaximizeView() {
    };

    return MaximizeView.extend(
        'MaximizeView', {

            /**
             * Render Maximize
             * @memberOf MaximizeView
             * @returns {boolean}
             */
            renderMaximize: function renderMaximize() {

                if (this.isCached('$maximize', MaximizeElement)) {
                    return false;
                }

                /**
                 * Define Maximize element
                 * @type {MaximizeElement}
                 */
                this.elements.$maximize = new MaximizeElement(this, {
                    id: this.createUUID(),
                    $container: this.elements.$container.$
                });
            },

            /**
             * Render maximize content
             * @memberOf MaximizeView
             * @param data
             * @returns {boolean}
             */
            renderContent: function renderContent(data) {

                /**
                 * Define content
                 * @type {{}}
                 */
                this.elements.items = {};
                this.elements.$maximize.empty();

                this.renderHeader(Header, 'Maximize Widgets');

                this.renderFilter(
                    this.updateFooterContent.bind(this)
                );

                for (var index in data) {

                    if (data.hasOwnProperty(index)) {

                        /**
                         * Render item
                         * @type {MaximizeContentElement}
                         */
                        var $item = new MaximizeContentElement(this, {
                            style: 'content',
                            id: [
                                data[index].model.getConfig('uuid'),
                                this.scope.constructor.prototype.name.toDash()
                            ].join('-'),
                            $container: this.elements.$maximize.$,
                            data: data[index]
                        });

                        this.scope.observer.publish(
                            this.scope.eventManager.eventList.storeItem,
                            data[index]
                        );

                        this.controller.defineContentReferrer(data[index]);

                        this.elements.items[$item.id] = $item;
                    }
                }

                this.elements.$maximize.scrollCover(
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
             * @memberOf MaximizeView
             */
            updateFooterContent: function updateFooterContent() {
                this.renderFooter(Footer, this.elements.$maximize);
            },

            /**
             * Render maximize
             * @memberOf MaximizeView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventManager.eventList.successRendered,
                    this.renderMaximize.bind(this)
                );
            }

        },
        AntHill.prototype,
        BaseView.prototype,
        BasePreferencesElement.prototype
    )
});