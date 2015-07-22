/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSyntaxHighlighterPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SyntaxHighlighter Preferences Element
     * @constructor
     * @class SyntaxHighlighterPreferencesElement
     * @param {SyntaxHighlighterView} view
     * @param opts
     * @extends BaseElement
     * @extends WidgetPreferences
     * @returns {SyntaxHighlighterPreferencesElement}
     */
    var SyntaxHighlighterPreferencesElement = function SyntaxHighlighterPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SyntaxHighlighterPreferencesElement.extend('SyntaxHighlighterPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
