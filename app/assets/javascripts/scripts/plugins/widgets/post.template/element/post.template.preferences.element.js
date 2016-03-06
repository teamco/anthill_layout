/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function definePostTemplatePreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define PostTemplate Preferences Element
     * @param view
     * @param opts
     * @returns {PostTemplatePreferencesElement}
     * @constructor
     * @class PostTemplatePreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var PostTemplatePreferencesElement = function PostTemplatePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return PostTemplatePreferencesElement.extend('PostTemplatePreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});