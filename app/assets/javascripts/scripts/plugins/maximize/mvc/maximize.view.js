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
], function defineMaximizeView(AntHill, BaseView, BasePreferences, Header, Footer, MaximizeContent, Maximize) {

    /**
     * Define view
     * @class MaximizeView
     * @constructor
     * @extends BaseView
     * @extends BasePreferences
     */
    var MaximizeView = function MaximizeView() {
    };

    return MaximizeView.extend('MaximizeView', {

        /**
         * Render Maximize
         * @member MaximizeView
         * @returns {boolean}
         */
        renderMaximize: function renderMaximize() {

            if (this.isCached('$maximize', Maximize)) {
                return false;
            }

            this.header(Header, this.elements.$container).setText(
                'Page Widgets'
            );

            /**
             * Define Maximize element
             * @type {MaximizeElement}
             */
            this.elements.$maximize = new Maximize(this, {
                id: this.createUUID(),
                $container: this.elements.$container.$
            });

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$maximize.getFooter()
            );
        },

        /**
         * Render maximize content
         * @member MaximizeView
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

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Render item
                     * @type {*}
                     */
                    var $item = new MaximizeContent(this, {
                        style: 'content',
                        id: [
                            data[index].model.getConfig('uuid'),
                            this.scope.constructor.name.toLowerCase()
                        ].join('-'),
                        $container: this.elements.$maximize.$,
                        data: data[index]
                    });

                    this.scope.observer.publish(
                        this.scope.eventmanager.eventList.storeItem,
                        data[index]
                    );

                    this.controller.defineContentReferrer(data[index]);

                    this.elements.items[$item.id] = $item;
                }
            }

            this.elements.$maximize.scrollCover(
                this.elements.$container.$
            );

            this.footer(Footer, this.elements.$container).setHtml(
                this.elements.$maximize.getFooter()
            );
        },

        /**
         * Show preferences
         * @member MaximizeView
         * @param config
         */
        showPreferences: function showPreferences(config, load) {

            /**
             * Define scope
             * @type {Maximize}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.setActiveContent,
                config.uuid
            );

            if (load) {

                /**
                 * Define $html
                 * @type {BaseElement}
                 */
                var $html = this.scope.activeContent.view.renderPreferences();

                this.openPreferences({
                    config: config,
                    $html: $html.$,
                    style: [
                        config.preferences.resource,
                        'widget-prefs preferences'
                    ].join(' '),
                    title: 'Widget preferences',
                    buttons: {
                        rules: {
                            text: 'Rules',
                            events: {
                                click: 'rules' + this.scope.constructor.name
                            }
                        },
                        reject: {
                            text: 'Cancel',
                            events: {
                                click: ['rejectModalEvent', 'restoreWidgetsLayerIndex']
                            }
                        }
                    }
                });
            }
        },

        /**
         * Render maximize
         * @member MaximizeView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderMaximize.bind(this)
            );
        }

    }, AntHill.prototype, BaseView.prototype, BasePreferences.prototype)

});