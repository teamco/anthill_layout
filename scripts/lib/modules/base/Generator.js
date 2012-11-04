/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

Base.prototype.Generator = function Generator(base) {
    this.base = base;
};

jQuery.extend(true, Base.prototype.Generator.prototype, {
    // Generate UUID
    // http://www.ietf.org/rfc/rfc4122.txt
    UUID: function UUID() {
        var s = [];
        var hexDigits = '0123456789abcdef';
        var i;
        for (i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = '4';
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    },
    timestamp: function timestamp() {
        return Number(new Date());
    }
});
