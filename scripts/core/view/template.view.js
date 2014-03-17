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
    'element/template/template.element',
    'element/template/template.element.content'
], function defineTemplateView(BaseView, Header, Footer, TemplateHTML, PageContainer) {

    /**
     * Define TemplateView
     * @class TemplateView
     * @extends BaseView
     * @constructor
     */
    var TemplateView = function TemplateView() {
    };

    return TemplateView.extend('TemplateView', {

        /**
         * Render template
         * @member TemplateView
         * @param $container
         */
        renderTemplate: function renderTemplate($container) {

            /**
             * Define $template
             * @type {TemplateElement}
             */
            this.elements.$template = new TemplateHTML(this, {
                id: this.createUUID(),
                $container: $container,
                style: 'template-content'
            });

            this.header(Header, this.elements.$template);
            this.pages();
            this.footer(Footer, this.elements.$template);
        },

        /**
         * Render pages
         * @member TemplateView
         */
        pages: function pages() {

            /**
             * Define $pages
             * @type {TemplateContent}
             */
            this.elements.$pages = new PageContainer(this, {
                $container: this.elements.$template.$,
                style: 'pages'
            });
        },

        /**
         * Render template
         * @member TemplateView
         * @param silent
         * @param widget
         */
        render: function render(silent, widget) {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                [widget.view.elements.$widget.getContent(), silent]
            );
        }

    }, BaseView.prototype)

});