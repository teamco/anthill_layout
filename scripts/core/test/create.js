/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/routes',
    'config/application'
], function defineTest(Routes, Application) {
    window.app = new Application({
        html: {
            container: 'body'
        }
    });
    window.app.view.render();

    window.app.observer.publish(window.app.eventmanager.eventList.createWorkspace);
    window.app.workspace.view.render();

    window.app.workspace.observer.publish(window.app.workspace.eventmanager.eventList.createPage);
    window.app.workspace.page.view.render();

    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
    window.app.workspace.page.widget.view.render();

    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
    window.app.workspace.page.widget.view.render();

    window.app.workspace.observer.publish(window.app.workspace.eventmanager.eventList.createPage);
    window.app.workspace.page.view.render();

    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
    window.app.workspace.page.widget.view.render();

});