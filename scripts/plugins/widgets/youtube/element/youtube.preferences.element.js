/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineYoutubePreferencesElement(BaseElement) {

    /**
     * Define Youtube Preferences Element
     * @param view
     * @param opts
     * @returns {YoutubePreferencesElement}
     * @constructor
     * @class YoutubePreferencesElement
     */
    var YoutubePreferencesElement = function YoutubePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts.data);

        return this;
    };

    return YoutubePreferencesElement.extend({

        /**
         * Render data
         * @param data
         */
        renderData: function renderData(data) {

            /**
             * Define dom nodes
             * @type {Array}
             */
            var nodes = [];

            for (var index in data) {

                if (data.hasOwnProperty(index)) {

                    /**
                     * Get text field
                     * @type {*[]}
                     */
                    var textField = this.renderTextField({
                        name: index,
                        text: index,
                        placeholder: 'Enter ' + index,
                        value: data[index]
                    });

                    nodes.push(
                        $('<li />').append(textField)
                    )
                }
            }

            this.$.append(nodes);
        }

    }, BaseElement.prototype);

});