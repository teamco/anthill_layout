/**
 * Created by teamco on 7/23/14.
 */

define([], function defineTextDownloadRenderer() {

  /**
   * Define TextDownloadRenderer
   * @class TextDownloadRenderer
   * @constructor
   */
  var TextDownloadRenderer = function TextDownloadRenderer() {

  };

  return TextDownloadRenderer.extend('TextDownloadRenderer', {

    /**
     * Render text downloader
     * @memberOf TextDownloadRenderer
     * @param {{
         *      as: string,
         *      text: string,
         *      title: string
         * }} opts
     */
    renderTextDownloader: function renderTextDownloader(opts) {

      return $('<a />').attr({
        download: opts.as || 'download.txt',
        href: "data:text/plain;base64," + btoa(opts.text || ''),
        title: opts.title
      }).text(opts.title);
    }
  });
});


