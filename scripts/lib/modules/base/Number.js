/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */
Base.prototype.Number = function Number(base) {
    this.base = base;
};

Base.prototype.Number.extend({

    defaultNumberType: 10,

    // Convert String to Integer
    // Return: integer || 0 if NaN
    str2int: function str2int(s, t) {
        var number = parseInt(s, this.base.define(t, this.defaultNumberType));
        return this.base.isNumber(number) ? number : 0;
    },
    // Convert String to Integer
    // Return: float || 0 if NaN
    str2float: function str2float(s, t) {
        var number = parseFloat(s, this.base.define(t, this.defaultNumberType));
        return this.base.isNumber(number) ? number : 0;
    }
}, Base);
