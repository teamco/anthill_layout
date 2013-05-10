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
     * @constructor
     */
    var Config = function Config() {
    };

    return Config.extend({

        /**
         * Define debugger relations
         * @param debug
         */
        defineDebugger: function defineDebugger(debug) {
            this.debugger = debug;

            this.debugger.component.debugger = this.debugger;
            this.debugger.grid.debugger = this.debugger;
            this.debugger.layout.debugger = this.debugger;
            this.debugger.page.debugger = this.debugger;
            this.debugger.tabs.debugger = this.debugger;
            this.debugger.widget.debugger = this.debugger;

            this.debugger.page.defineSelectors();
        },

        /**
         * Define scope
         * @param {*} debug
         * @returns {*}
         */
        defineScope: function defineScope(debug) {
            var scope = debug.scope,
                item = scope.model.getItemNamespace();

            this.defineDebugger(debug);

            while (item !== 'object') {
                scope = this.setScope(scope, item);
                item = scope.model.getItemNamespace();
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