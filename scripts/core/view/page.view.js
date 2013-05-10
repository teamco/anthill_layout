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
    'element/modal.element',
    'element/page/page.element',
    'element/page/page.element.content',
    'element/page/page.element.delta.scroll'
], function definePageView(BaseView, Header, Footer, Modal, Page, Content, DeltaScroll) {

    var View = function View() {
        this.elements = {};
    };

    return View.extend({
        /**
         * Render Page
         */
        renderPage: function renderPage() {
            this.elements.$page = new Page(this, {
                id: this.createUUID(),
                $container: this.getContainerSelector()
            });
            this.header(Header, this.elements.$page);
            this.widgets();
            this.deltaScroll();
            this.footer(Footer, this.elements.$page);

            this.elements.$page.stretch();
        },
        deltaScroll: function deltaScroll() {
            this.elements.$deltaScroll = new DeltaScroll(this, {
                $container: this.elements.$page.$,
                style: 'delta-scroll'
            });
        },
        widgets: function widgets() {
            this.elements.$widgets = new Content(this, {
                style: 'widgets',
                $container: this.elements.$page.$
            });
        },

        /**
         * Show destroy widgets confirmation modal dialog
         */
        destroyWidgetsModalDialog: function destroyWidgetsModalDialog(widgets) {
            this.modalDialog(Modal, {
                style: this.scope.constructor.name.toLowerCase() + '-modal',
                $container: this.elements.$page.$,
                item: widgets,
                type: 'warning',
                title: 'Remove widgets',
                html: [
                    'Are you sure want to destroy widgets:',
                    $.map(widgets, function map(i, uuid) {
                        return uuid;
                    }).join('<br />')
                ].join('<br />'),
                cover: true,
                autoclose: true,
                buttons: {
                    approve: {
                        text: 'OK',
                        events: {
                            click: 'approveItemsDestroy'
                        }
                    },
                    reject: {
                        text: 'Cancel',
                        events: {
                            click: 'rejectItemDestroy'
                        }
                    }
                }
            });
        },

        /**
         * Render page
         */
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }

    }, BaseView.prototype)

});