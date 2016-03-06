/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineSlideSharePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define SlideShare Preferences Element
     * @param view
     * @param opts
     * @returns {SlideSharePreferencesElement}
     * @constructor
     * @class SlideSharePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var SlideSharePreferencesElement = function SlideSharePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return SlideSharePreferencesElement.extend('SlideSharePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
