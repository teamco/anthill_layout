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
], function definePageView(BaseView, Header, Footer, Modal, Page, Content, DeltaScroll){

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
         * Show destroy widget confirmation modal dialog
         */
        destroyWidgetModalDialog: function destroyWidgetModalDialog(widget) {
            this.modalDialog(Modal, {
                style: this.scope.constructor.name.toLowerCase() + '-modal',
                $container: this.elements.$page.$,
                item: widget,
                type: 'warning',
                title: 'Remove widget',
                text: 'Are you sure want to destroy widget:\n' +
                    widget.model.getConfig('uuid'),
                cover: true,
                buttons: {
                    approve: {
                        text: 'OK',
                        events: {
                            click: 'approveItemDestroy'
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
        render: function render() {
            this.scope.observer.publish(this.scope.eventmanager.eventList.successRendered);
        }
    }, BaseView.prototype)

});