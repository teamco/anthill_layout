/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jqueryui'
], function defineWidgetDrag() {
    var Drag = function Drag(scope) {
        this.scope = scope;

        this.init();
    };

    return Drag.extend({
        init: function init() {
            var scope = this.scope;
            scope.permission.check({
                might: 'draggable',
                callback: function initDraggable() {
                    var config = scope.config.events.draggable;
                    scope.view.elements.$widget.$.draggable({
                        snap: config.snap,
                        iframeFix: config.iframeFix,
                        scroll: config.scroll,
//                        stack: '.' + this.config.style,
//                        handle: this.config.draggable.handle,
//                        cancel: this.config.draggable.cancel,
                        containment: scope.config.parent.view.elements.$page.$,
                        start: this.start.bind(this),
                        stop: this.stop.bind(this),
                        drag: this.drag.bind(this)
                    });
                }.bind(this)
            });
        },
        start : function start(event, ui) {
//            this.widget.page.config.allowMaximize = false;
//            this.widget.html.hideWidgetContent(1);
//            this.widget.html.widgetOpacity(1);
//            this.widget.wireframe.move(this.widget.view.$widget.$);
        },
        stop : function stop(event, ui) {
//            if (!this.widget.html.checkWidgetPosition()) {
//                this.widget.html.fixWidgetPosition();
//            } else {
//                this.widget.map.dragSticker({
//                    animate: 1,
//                    organize: 1,
//                    $source: this.widget.view.$widget.$
//                });
//            }
//            this.widget.wireframe.delayedJob({
//                fname: 'widget.callbacks.draggable.stop',
//                callback: this.widget.wireframe.hide
//            });
//            this.widget.events.timestampStop(event, ui);
        },
        drag : function drag(event, ui) {
//            this.widget.debug.domInfo(event, ui);
//            App.callbacks.realTimeEventCaller({
//                callback: this.widget.map.dragSticker,
//                fname: "widget.map.sticker",
//                scope: this.widget.map,
//                params: {
//                    animate: 0,
//                    organize: 0,
//                    $source: this.widget.wireframe.$
//                },
//                speed: this.page.layout.config.html.dragSpeed
//            });
        }
    });
});