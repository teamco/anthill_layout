/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/application'
], function defineTest(Application) {
    window.app = new Application({
        html: {
            container: 'body'
        }
    });

    window.app.view.render();

    window.app.observer.publish(window.app.eventmanager.eventList.createWorkspace);

    var workspace1 = window.app.workspace;
    workspace1.view.render();
    workspace1.observer.publish(workspace1.eventmanager.eventList.createPage);

    var page1 = workspace1.page;
    page1.view.render();
    page1.observer.publish(page1.eventmanager.eventList.createWidget);

    var widget1 = page1.widget;
    widget1.view.render();

    page1.observer.publish(page1.eventmanager.eventList.createWidget);

    var widget2 = page1.widget;
    widget2.view.render();

//    window.app.workspace.observer.publish(window.app.workspace.eventmanager.eventList.createPage);
//    window.app.workspace.page.view.render();

//    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
//    window.app.workspace.page.widget.view.render();

});