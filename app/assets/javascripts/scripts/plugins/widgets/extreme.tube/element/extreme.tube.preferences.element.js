/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineExtremeTubePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define ExtremeTube Preferences Element
     * @param view
     * @param opts
     * @returns {ExtremeTubePreferencesElement}
     * @constructor
     * @class ExtremeTubePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var ExtremeTubePreferencesElement = function ExtremeTubePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return ExtremeTubePreferencesElement.extend('ExtremeTubePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
