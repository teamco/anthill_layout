/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:45 PM
 */

define([], function defineWidgetBase() {

    var WidgetBase = function WidgetBase() {

    };

    WidgetBase.extend({

        loadWidget: function loadWidget(path) {

            return require([path], function(Widget) {

                return Widget;

            });
        }
    });
});