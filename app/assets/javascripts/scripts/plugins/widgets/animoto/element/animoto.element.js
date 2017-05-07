/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element'
], function defineAnimotoElement(PluginElement) {

  /**
   * Define Animoto Element
   * @param view
   * @param opts
   * @returns {AnimotoElement}
   * @constructor
   * @class AnimotoElement
   * @extends PluginElement
   */
  var AnimotoElement = function AnimotoElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.addCSS('animoto', {resource: '/widgets'});

    return this;
  };

  return AnimotoElement.extend('AnimotoElement', {

    /**
     * Render Embedded content
     * @memberOf AnimotoElement
     * @param {{id, [classid], movie, type}} opts
     */
    renderEmbeddedContent: function renderEmbeddedContent(opts) {

      var $embed = opts.type === 'object' ?
          [
            '<', opts.type, ' id="', opts.id,
            '" width="100%" height="100%" classid="', opts.classid, '">',
            '<param name="movie" value="', opts.movie, '"/>',
            '<param name="allowFullScreen" value="true"/>',
            '<param name="allowscriptaccess" value="always"/>',
            '<embed id="', opts.id, '" src="', opts.movie,
            '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%"></embed>',
            '</', opts.type, '>'
          ].join('') :
          this.renderIframe(opts.movie, {
            id: opts.id
          });

      this.$.append($embed);
    }

  }, PluginElement.prototype);

});
