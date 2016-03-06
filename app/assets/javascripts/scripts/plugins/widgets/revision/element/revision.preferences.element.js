/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineRevisionPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Revision Preferences Element
     * @param view
     * @param opts
     * @returns {RevisionPreferencesElement}
     * @constructor
     * @class RevisionPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var RevisionPreferencesElement = function RevisionPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return RevisionPreferencesElement.extend('RevisionPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
