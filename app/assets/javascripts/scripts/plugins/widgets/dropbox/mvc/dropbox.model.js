/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model',
  'plugins/widgets/widget.content.model'
], function defineDropboxModel(BaseModel, WidgetContentModel) {

  /**
   * Define Dropbox model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class DropboxModel
   * @constructor
   */
  var DropboxModel = function DropboxModel() {

    /**
     * Define preferences
     * @memberOf DropboxModel
     * @type {{
     *      dropboxUrl: {type: string, disabled: boolean, value: undefined,
     *     visible: boolean}, dropboxApiKey: {type: string, disabled:
     *     boolean, value: undefined, visible: boolean}, dropboxBytes:
     *     {type: string, disabled: boolean, value: undefined, visible:
     *     boolean}, dropboxIcon: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}, dropboxFileName: {type: string,
     *     disabled: boolean, value: undefined, visible: boolean},
     *     dropboxDownload: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      dropboxFileName: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      dropboxUrl: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      dropboxApiKey: {
        type: 'text',
        disabled: false,
        value: '0lk3aqexag169bf',
        visible: true
      },
      dropboxBytes: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false
      },
      dropboxIcon: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false
      },
      dropboxThumbnail: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false
      },
      dropboxDownload: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true,
        value: true
      }
    };

    /**
     * Define rules
     * @memberOf DropboxModel
     * @type {{}}
     */
    this.rules = {};
  };

  return DropboxModel.extend('DropboxModel', {

    /**
     * Set Dropbox Url
     * @memberOf DropboxModel
     * @param {string} url
     */
    setDropboxUrl: function setDropboxUrl(url) {
      this.setPrefs('dropboxUrl', url);
    },

    /**
     * Set Dropbox Url
     * @memberOf DropboxModel
     * @param {boolean} download
     */
    setDropboxDownload: function setDropboxDownload(download) {
      this.setPrefs('dropboxDownload', download);
    },

    /**
     * Set Dropbox bytes
     * @memberOf DropboxModel
     * @param {number} bytes
     */
    setDropboxBytes: function setDropboxBytes(bytes) {
      this.setPrefs('dropboxBytes', bytes);
    },

    /**
     * Set Dropbox icon
     * @memberOf DropboxModel
     * @param {string} icon
     */
    setDropboxIcon: function setDropboxIcon(icon) {
      this.setPrefs('dropboxIcon', icon);
    },

    /**
     * Set Dropbox file name
     * @memberOf DropboxModel
     * @param {string} name
     */
    setDropboxFileName: function setDropboxFileName(name) {
      this.setPrefs('dropboxFileName', name);
    },

    /**
     * Set Dropbox thumbnail
     * @memberOf DropboxModel
     * @param {string} thumbnail
     */
    setDropboxThumbnail: function setDropboxThumbnail(thumbnail) {
      this.setPrefs('dropboxThumbnail', thumbnail);
    },

    /**
     * Set Dropbox API Key
     * @memberOf DropboxModel
     * @param {string} apiKey
     */
    setDropboxApiKey: function setDropboxApiKey(apiKey) {

      this.setPrefs('dropboxApiKey', apiKey);

      window.Dropbox = this.scope.base.define(window.Dropbox, {}, true);
      window.Dropbox.appKey = apiKey;
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});