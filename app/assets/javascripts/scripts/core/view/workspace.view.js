/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/workspace/workspace.element',
    'element/header.element',
    'element/footer.element',
    'element/workspace/workspace.element.content'
], function defineWorkspaceView(BaseView, WorkspaceElement, Header, Footer, WorkspaceContentElement) {

    /**
     * Define WorkspaceView
     * @class WorkspaceView
     * @extends BaseView
     * @constructor
     */
    var WorkspaceView = function WorkspaceView() {
    };

    return WorkspaceView.extend('WorkspaceView', {

        /**
         * Render workspace
         * @memberOf WorkspaceView
         */
        renderWorkspace: function renderWorkspace() {

            /**
             * Define $workspace
             * @type {WorkspaceElement}
             */
            this.elements.$workspace = new WorkspaceElement(this, {
                $container: this.getContainerSelector()
            });

            this.header(Header, this.elements.$workspace);
            this.pages();
            this.footer(Footer, this.elements.$workspace);
        },

        /**
         * Render pages
         * @memberOf WorkspaceView
         */
        pages: function pages() {

            /**
             * Define $pages
             * @type {WorkspaceContentElement}
             */
            this.elements.$pages = new WorkspaceContentElement(this, {
                $container: this.elements.$workspace.$,
                style: 'pages'
            });
        },

        /**
         * Render workspace
         * @memberOf WorkspaceView
         * @param silent
         */
        render: function render(silent) {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                silent
            );
        }
    }, BaseView.prototype)

});