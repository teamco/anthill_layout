/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineLifestreamElement(PluginElement) {

  /**
   * Define Lifestream Element
   * @param view
   * @param opts
   * @returns {LifestreamElement}
   * @constructor
   * @class LifestreamElement
   * @extends PluginElement
   */
  var LifestreamElement = function LifestreamElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('lifestream', {resource: '/widgets'});

    return this;
  };

  return LifestreamElement.extend('LifestreamElement', {

    /**
     * Render Embedded content
     * @memberOf LifestreamElement
     * @param {Array} data
     */
    renderEmbeddedContent: function renderEmbeddedContent(data) {

      /**
       * Get $element
       * @type {LifestreamElement}
       */
      var $element = this,
          count = 0;

      require(
          [
            'jquery.timeago',
            'plugins/widgets/lifestream/lib/jquery.lifestream.min'
          ],
          function loadStream() {

            $element.$.lifestream({
              limit: 400,
              list: data,
              feedloaded: function feedloaded() {

                count++;

                // Check if all the feeds have been loaded
                if (count === data.length + 1) {

                  $('li', $element.$).each(function eachFeed() {

                    var element = $(this),
                        date = new Date(element.data('time'));

                    element.append([
                      '<abbr class="timeago" title="',
                      date.toISO8601(date), '">', date, '</abbr>'
                    ].join(''));
                  });
                  $('.timeago', $element.$).timeago();
                }
              }
            });
          }
      );
    }

  }, PluginElement.prototype);

});
