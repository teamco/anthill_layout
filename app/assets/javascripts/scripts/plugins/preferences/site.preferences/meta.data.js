/**
 * Created by teamco on 26/03/2016.
 */
defineP(function defineSiteConfigMetaDataPreferences() {

  /**
   * Define SiteConfig MetaData Preferences
   * @class SiteConfigMetaDataPreferences
   * @extends Renderer
   * @constructor
   */
  var SiteConfigMetaDataPreferences = function SiteConfigMetaDataPreferences() {
  };

  return SiteConfigMetaDataPreferences.extend('SiteConfigMetaDataPreferences', {

    /**
     * Set site title preference
     * @memberOf SiteConfigMetaDataPreferences
     * @returns {*|jQuery}
     */
    setSiteTitle: function setSiteTitle() {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace(),
          preferences = workspace.model.getConfig('preferences');

      /**
       * Get site title
       * @type {*|string}
       */
      var siteTitle = preferences['siteTitle'];

      /**
       * Split SEO title
       * @type {*|Array}
       */
      var seoTitle = workspace.view.get$item().getSiteTitle().split(
          workspace.model.getConfig('SEOSeparator')
      );

      /**
       * Render title
       * @type {*[]}
       */
      var $title = this.renderTextField({
        name: 'siteTitle',
        text: 'Title',
        disabled: false,
        placeholder: 'Enter title',
        visible: true,
        value: siteTitle || seoTitle[seoTitle.length - 1]
      });

      return $('<li />').addClass('workspace-title-prefs').append($title);
    },

    /**
     * Set site meta description
     * @memberOf SiteConfigMetaDataPreferences
     * @returns {*|jQuery}
     */
    setSiteMetaDescription: function setSiteMetaDescription() {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace(),
          preferences = workspace.model.getConfig('preferences');

      /**
       * Render description
       * @type {*[]}
       */
      var $description = this.renderTextArea({
        name: 'siteDescription',
        text: 'Description',
        disabled: false,
        placeholder: 'Enter description',
        visible: true,
        value: preferences['siteDescription'] ||
        $('meta[name="description"]').attr('content')
      });

      return $('<li />').addClass('workspace-description-prefs').
          append($description);
    },

    /**
     * Set site meta key words
     * @memberOf SiteConfigMetaDataPreferences
     * @returns {*|jQuery}
     */
    setSiteMetaKeywords: function setSiteMetaKeywords() {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace(),
          preferences = workspace.model.getConfig('preferences');

      /**
       * Render description
       * @type {*[]}
       */
      var $keywords = this.renderTextArea({
        name: 'siteKeywords',
        text: 'Keywords',
        placeholder: 'Enter keywords',
        disabled: false,
        visible: true,
        value: preferences['siteKeywords'] ||
        $('meta[name="keywords"]').attr('content')
      });

      return $('<li />').addClass('workspace-keywords-prefs').append($keywords);
    },

    /**
     * Set site meta author
     * @memberOf SiteConfigMetaDataPreferences
     * @returns {*|jQuery}
     */
    setSiteMetaAuthor: function setSiteMetaAuthor() {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.view.controller.getWorkspace(),
          preferences = workspace.model.getConfig('preferences');

      /**
       * Render description
       * @type {*[]}
       */
      var $author = this.renderTextField({
        name: 'siteAuthor',
        text: 'Author',
        placeholder: 'Enter author',
        disabled: false,
        visible: true,
        value: preferences['siteAuthor'] ||
        $('meta[name="author"]').attr('content')
      });

      return $('<li />').addClass('workspace-author-prefs').append($author);
    }
  });
});