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
     * @constructor
     */
    var Page = function Page(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        this.configScope();

    };

    return Page.extend({

    }, Actions.prototype);
});
