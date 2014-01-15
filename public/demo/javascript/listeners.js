/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/prototype',
    'modules/debugger',
    'config/application',
    'config/workspace',
    'config/page',
    'config/template',
    'config/widget'
], function defineListeners(Prototype, Debugger, Application, Workspace, Page, Template, Widget) {

    Prototype.preload([
        Application,
        Workspace,
        Page,
        Template,
        Widget
    ], 'globalListeners', {});

    /**
     * Define Application Global listeners
     * @type {{
     * }}
     */
    Application.prototype.globalListeners = {

        successRendered: {
            name: "success.rendered",
            callback: function successRenderedCallback() {
                console.log('successRenderedCallback');
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