/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application',
    'config/workspace',
    'config/page',
    'config/layout',
    'config/template',
    'config/widget',
    'plugins/gallery/gallery'
], function defineListeners(Application, Workspace, Page, Layout, Template, Widget, Gallery) {

    /**
     * Load listeners
     */
    Application.prototype.globalListeners = Application.prototype.globalListeners || {};
    Workspace.prototype.globalListeners = Workspace.prototype.globalListeners || {};
    Page.prototype.globalListeners = Page.prototype.globalListeners || {};
    Template.prototype.globalListeners = Template.prototype.globalListeners || {};
    Layout.prototype.globalListeners = Layout.prototype.globalListeners || {};
    Widget.prototype.globalListeners = Widget.prototype.globalListeners || {};

    /**
     * Define Application Global listeners
     * @type {{successRendered: {name: string, callback: successRenderedCallback}}}
     */
    Application.prototype.globalListeners = {

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {

                /**
                 * Init gallery plugin
                 * @type {plugins.gallery.gallery}
                 */
                this.gallery = new Gallery({}, this);

                this.gallery.view.render();
            }
        }

    };

    /**
     * Define Workspace Global listeners
     * @type {{
     * }}
     */
    Workspace.prototype.globalListeners = {
    };

    /**
     * Define Page Global listeners
     * @type {{
     * }}
     */
    Page.prototype.globalListeners = {
    };

    /**
     * Define Template Global listeners
     * @type {{
     * }}
     */
    Template.prototype.globalListeners = {
    };

    /**
     * Define Widget Global listeners
     * @type {{
     * }}
     */
    Widget.prototype.globalListeners = {
    };

});