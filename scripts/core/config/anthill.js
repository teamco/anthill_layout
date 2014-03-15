/**
 * Created with RubyMine.
 * User: i061485
 * Date: 3/5/14
 * Time: 2:43 PM
 */

define([
    'modules/base',
    'modules/i18n'
], function defineAntHill(Base, i18n) {

    /**
     * Define AntHill
     * @class AntHill
     * @constructor
     */
    var AntHill = function AntHill() {
    };

    /**
     * Define base
     * @type {modules.base}
     */
    AntHill.prototype.base = new Base();

    /**
     * Define translations
     * @type {modules.i18n}
     */
    AntHill.prototype.i18n = new i18n('en-us');

    return AntHill;
});