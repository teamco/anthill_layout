/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:42 PM
 */

define([], function defineEmptyWidget(){

    /**
     * Define empty widget
     * @class EmptyWidget
     * @constructor
     */
    var EmptyWidget = function EmptyWidget() {
        this.text = 'Empty';
    };

    return EmptyWidget.extend({

        getData: function getData() {
            return this.text;
        }

    });

});