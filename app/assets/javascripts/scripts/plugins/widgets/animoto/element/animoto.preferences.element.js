/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineAnimotoPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Animoto Preferences Element
     * @param view
     * @param opts
     * @returns {AnimotoPreferencesElement}
     * @constructor
     * @class AnimotoPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var AnimotoPreferencesElement = function AnimotoPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return AnimotoPreferencesElement.extend(
        'AnimotoPreferencesElement', {},
        BaseElement.prototype,
        WidgetPreferences.prototype
    );
});
