/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineLiveLeakPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define LiveLeak Preferences Element
     * @param view
     * @param opts
     * @returns {LiveLeakPreferencesElement}
     * @constructor
     * @class LiveLeakPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var LiveLeakPreferencesElement = function LiveLeakPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return LiveLeakPreferencesElement.extend('LiveLeakPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
