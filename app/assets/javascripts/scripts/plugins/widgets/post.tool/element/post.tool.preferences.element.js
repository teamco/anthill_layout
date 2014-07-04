/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePostToolPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PostTool Preferences Element
     * @param view
     * @param opts
     * @returns {PostToolPreferencesElement}
     * @constructor
     * @class PostToolPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PostToolPreferencesElement = function PostToolPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PostToolPreferencesElement.extend('PostToolPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});