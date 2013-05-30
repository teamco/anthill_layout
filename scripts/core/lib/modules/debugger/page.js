/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */

define([
    'modules/debugger/actions'
], function defineDebuggerPage(Actions) {

    /**
     * Define Debugger Page
     * @param {*} debug
     * @param {Page} scope
     * @class DebuggerPage
     * @constructor
     */
    var DebuggerPage = function DebuggerPage(debug, scope) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        /**
         * Define scope
         * @type {Page}
         */
        this.scope = scope;

        this.init();

    };

    return DebuggerPage.extend({

    }, Actions.prototype);
});
