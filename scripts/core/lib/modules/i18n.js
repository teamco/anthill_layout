/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function definei18n() {

    var i18n = function i18n() {

    };

    return i18n.extend({
        i18n: function i18n(object){
            if (typeof(object) === 'object'){
                var result = App.translations[object[0]],
                    i;
                for (i = 1; i < object.length; i++){
                    result = result.replace('{' + (i-1) + '}', object[i]);
                }
                return result;
            }
            return App.translations[object];
        }
    });

});