/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineSyntaxHighlighterElement(PluginElement) {

    /**
     * Define SyntaxHighlighter Element
     * @param view
     * @param opts
     * @returns {SyntaxHighlighterElement}
     * @constructor
     * @class SyntaxHighlighterElement
     * @extends PluginElement
     */
    var SyntaxHighlighterElement = function SyntaxHighlighterElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('syntax.highlighter', {resource: '/widgets'});

        return this;
    };

    return SyntaxHighlighterElement.extend('SyntaxHighlighterElement', {

        /**
         * Render Embedded content
         * @memberOf SyntaxHighlighterElement
         * @param {string} code
         * @param {string} file
         * @param {string} alias
         */
        renderEmbeddedContent: function renderEmbeddedContent(code, file, alias) {

            /**
             * Get scope
             * @type {AntHill|SyntaxHighlighter}
             */
            var scope = this.view.scope;

            if (!code || (code && !code.length)) {

                scope.logger.debug('Initial state');
                return false;
            }

            this.$.append('<pre class="brush: ' + alias.split(',')[0] + '">' + code + '</pre>');

            require([
                'plugins/widgets/syntax.highlighter/lib/scripts/shCore'
            ], function _loadScriptCore() {

                require([
                    'plugins/widgets/syntax.highlighter/lib/scripts/' + file.replace(/\.js/, '')
                ], function _loadScriptType() {

                    SyntaxHighlighter.highlight();
                });
            });
        }

    }, PluginElement.prototype);

});
