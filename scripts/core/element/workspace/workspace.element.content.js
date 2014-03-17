/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineWorkspaceContent(BaseElement) {

    /**
     * Define Workspace Content
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class WorkspaceContent
     * @extends BaseElement
     */
    var WorkspaceContent = function WorkspaceContent(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return WorkspaceContent.extend('WorkspaceContent', {

        /**
         * Define height
         * @member WorkspaceContent
         */
        defineHeight: function defineHeight() {

            var header = this.view.elements.$header,
                footer = this.view.elements.$footer,
                $container = this.getRootContainer();

            var headerHeight = header.$ ? header.$.height() : 0,
                footerHeight = footer.$ ? footer.$.height() : 0,
                containerHeight = $container.height();

            this.setHeight(containerHeight - (headerHeight + footerHeight));
        }

    }, BaseElement.prototype);
});