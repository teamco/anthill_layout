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

    var workspace1 = window.app.api.createWorkspace([], true),
        page1 = workspace1.api.createPage([], true),
        widget1 = page1.api.createWidget({type: page1.config.widget.types.template}, true)
//        ,
//        page2 = page1.api.createTemplate(widget1)
//        ,  widget2 = page2.api.createWidget([], true)
//        ,  widget3 = page2.api.createWidget([], true)
 //,
//        widget3 = page1.api.createWidget([], true),
//        widget4 = page1.api.createWidget([], true)
        ;

});
