/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/widget.preferences'
], function defineTextEditorPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define TextEditor Preferences Element
     * @param view
     * @param opts
     * @returns {TextEditorPreferencesElement}
     * @constructor
     * @class TextEditorPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var TextEditorPreferencesElement = function TextEditorPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return TextEditorPreferencesElement.extend('TextEditorPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});