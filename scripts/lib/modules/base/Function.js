/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

Base.prototype.Function = function Function(base) {
    this.base = base;
};

jQuery.extend(true, Base.prototype.Function.prototype, {
    getConstructorName: function getConstructorName(scope) {
        if (!this.base.isDefined(scope)) {
            return undefined;
        }
        // IE issue RegEx instead of constructor name
        var instance = scope.constructor.toString().match(/function (\w*)/);
        if (this.base.isDefined(instance)) {
            return instance[1];
        }
        return undefined;  // Undefined
    }
});
