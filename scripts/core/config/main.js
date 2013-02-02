requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jquery: 'lib/jquery/jquery-1.8.2.min',
        jqueryui: 'lib/jquery/jquery-ui-1.9.1.custom.min',
        application: 'application',
        controller: 'controller',
        model: 'model',
        event: 'event',
        view: 'view',
        extends: 'lib/extends',
        modules: 'lib/modules'
    }
});

requirejs([
    'jquery',
    'extends/bind',
    'extends/inherits'
]);

define([
    'config/routes',
    'config/application'
], function defineApp(Routes, Application) {
    window.app = new Application({
        html: {
            container: 'body'
        }
    });
    window.app.view.render();

    window.app.observer.publish(window.app.eventmanager.eventList.createWorkspace);
    window.app.workspace.view.render();

//    window.app.workspace.observer.publish(window.app.workspace.eventmanager.eventList.createPage);
//    window.app.workspace.page.view.render();
//
//    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
//    window.app.workspace.page.widget.view.render();
//
//    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
//    window.app.workspace.page.widget.view.render();
//
//    window.app.workspace.observer.publish(window.app.workspace.eventmanager.eventList.createPage);
//    window.app.workspace.page.view.render();
//
//    window.app.workspace.page.observer.publish(window.app.workspace.page.eventmanager.eventList.createWidget);
//    window.app.workspace.page.widget.view.render();
});