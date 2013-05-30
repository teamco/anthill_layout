/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:32 PM
 */
define([
], function defineDebuggerConfig() {

    /**
     * Define Debugger Config
     * @class DebuggerConfig
     * @param {*} debug
     * @constructor
     */
    var DebuggerConfig = function DebuggerConfig(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;

        this.defineScope();

    };

    return DebuggerConfig.extend({

        /**
         * Define scope
         * @returns {*}
         */
        defineScope: function defineScope() {
            var scope = this.debugger.scope,
                item = scope.model.getItemNameSpace();

            while (item !== 'object') {
                scope = this.setScope(scope, item);
                item = scope.model.getItemNameSpace();
            }

            this.validateScopes();
        },

        /**
         * Validate required scopes
         */
        validateScopes: function validateScopes() {
            var hash = this.debugger.scopes,
                scopes = ['Workspace', 'Page', 'Widget'];

            if (this.debugger.base.lib.hash.hashLength(hash) < scopes.length) {
                $.each(scopes, function each(index, value) {
                    this.debugger.scope.controller.checkCondition({
                        condition: !hash.hasOwnProperty(value.toLowerCase()),
                        msg: 'Undefined scope',
                        type: 'warn',
                        args: value
                    });
                }.bind(this));
            }
        },

        /**
         * Set scope
         * @param {{}} scope
         * @param {String} item
         * @returns {*}
         */
        setScope: function setScope(scope, item) {
            var node = scope[item];
            this.debugger.scopes[node.constructor.name.toLowerCase()] = node;
            return node;
        }

    });

});