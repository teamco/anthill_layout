/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jqueryui'
], function defineWidgetResize() {
    var Resize = function Resize(scope) {
        this.scope = scope;

        this.init();
    };

    return Resize.extend({
        init: function init() {
            var scope = this.scope;
            scope.permission.check({
                might: 'resizable',
                callback: function initResizable() {
                    var config = scope.config.events.resizable;

//                    var minDims = this.widget.page.layout.html.minWidgetDims(),
//                        config = this.widget.page.layout.config.html,
//                        resize = this.widget.callbacks.resize;
//                    this.widget.view.$widget.$.resizable({
//                        minHeight: minDims.y,
//                        minWidth:  minDims.x,
//                        containment: this.widget.page.view.$page.$,
//                        scrollable: {
//                            container: this.widget.page.view.$page.$,
//                            step: config.scrollableStep,
//                            delay: config.scrollableDelay,
//                            belt: config.scrollableBelt
//                        },
//                        start: resize.start.bind(this),
//                        stop: resize.stop.bind(this),
//                        resize: resize.resize.bind(this)
//                    });



                    scope.view.elements.$widget.$.resizable({
                        containment: scope.config.parent.view.elements.$page.$,
                        start: this.start.bind(this),
                        stop: this.stop.bind(this),
                        resize: this.resize.bind(this)
                    });
                }.bind(this)
            });
        },
        start : function start(event, ui) {
        },
        stop : function stop(event, ui) {
        },
        resize : function resize(event, ui) {
        }
    });
});