/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseHTML(Base) {

    var BaseHTML = function BaseHTML() {
    };

    BaseHTML.extend({
        escapeHTML: function escapeHTML(text, escape) {
            var div = $('<div/>');
            if (typeof(text) === 'string') {
                return escape ?
                    // Escape the text with HTML encoding chars
                    div.text(text).html() :
                    // Unescape the text from HTML encoding chars
                    div.html(text).text();
            } else {
                return typeof text;
            }
        },
        escapeHTMLSymbols: function escapeHTMLSymbols(text, source, target) {
            return this.escapeHTML(text, 1).replace(
                (new RegExp(source, 'gi')),
                target
            );
        }
    });

    return new BaseHTML();

});