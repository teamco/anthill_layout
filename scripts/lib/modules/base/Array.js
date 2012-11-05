/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

Base.prototype.Array = function Array(base) {
    this.base = base;
};

Base.prototype.Array.extend({
    // Removes undefined/null items from an Array
    // Return: Compact Array
    compact: function compact(array) {
        var res = [];
        array = this.define(array, []);
        jQuery.each(array, function (k, v) {
            if (this.base.isDefined(v)) {
                res.push(v);
            }
        }.bind(this));
        return res;
    }
});