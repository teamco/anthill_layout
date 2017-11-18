defineP(function defineVirtualSpiritsPreferences() {

  /**
   * Define Virtual Spirits Preferences
   * @class VirtualSpiritsPreferences
   * @extends Renderer
   * @constructor
   */
  var VirtualSpiritsPreferences = function VirtualSpiritsPreferences() {
  };

  return VirtualSpiritsPreferences.extend('VirtualSpiritsPreferences', {

    /**
     * Render VirtualSpirits
     * @memberOf VirtualSpiritsPreferences
     * @returns {*|jQuery}
     */
    renderVirtualSpirits: function renderVirtualSpirits() {

      /**
       * Get workspace
       * @type {*|Workspace}
       */
      var workspace = this.view.controller.getWorkspace();

      /**
       * Get workspace prefs
       * @type {{virtualSpiritsHtmlCode, activateVirtualSpirits}}
       */
      var preferences = workspace.model.getConfig('preferences');

      /**
       * Render input
       * @type {*[]}
       */
      var $textfield = this.renderTextArea({
        name: 'virtualSpiritsHtmlCode',
        text: 'HTML Code',
        disabled: false,
        visible: true,
        value: preferences.virtualSpiritsHtmlCode || '',
        validate: {
          blank: true
        }
      });

      var $checkbox = this.renderCheckbox({
        name: 'activateVirtualSpirits',
        text: 'Activate',
        checked: preferences.activateVirtualSpirits,
        value: preferences.activateVirtualSpirits,
        disabled: false,
        visible: true
      });

      return $('<div class="workspace-virtual-spirits-prefs" />').append(
          $textfield, $checkbox
      );
    },

    /**
     * Load VirtualSpirits Html Code
     * @memberOf VirtualSpiritsPreferences
     */
    loadActivateVirtualSpirits: function loadActivateVirtualSpirits() {

      this.logger.debug('Load VirtualSpirits Html Code', arguments);

      /**
       * Get prefs
       * @type {{virtualSpiritsHtmlCode}}
       */
      var preferences = this.model.getConfig('preferences');

      /**
       * Get Html Code
       * @type {string|boolean}
       */
      var htmlCode = preferences.virtualSpiritsHtmlCode,
          activate = preferences.activateVirtualSpirits;

      if (this.controller.isServiceActivated(htmlCode, activate)) {

        var matcher = htmlCode.match(/vsid.+(".+")/);

        if (!matcher) {
          this.logger.warn('Unable to fetch ID');
          return false;
        }

        var vsid = matcher[1].replace(/"/g, '');
        (function () {
          var vsjs = document.createElement('script');
          vsjs.type = 'text/javascript';
          vsjs.async = true;
          vsjs.setAttribute('defer', 'defer');
          vsjs.src = ('https:' == document.location.protocol ? 'https://' :
                  'http://') + 'www.virtualspirits.com/vsa/chat-' + vsid +
              '.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(vsjs, s);
        })();
      }
    }
  });
});