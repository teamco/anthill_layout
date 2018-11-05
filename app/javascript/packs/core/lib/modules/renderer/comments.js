/**
 * Created by teamco on 7/10/14.
 */

defineP([], function defineCommentsRenderer() {

  /**
   * Define CommentsRenderer
   * @class CommentsRenderer
   * @constructor
   */
  var CommentsRenderer = function CommentsRenderer() {
  };

  return CommentsRenderer.extend('CommentsRenderer', {

    /**
     * Render comments form
     * @memberOf CommentsRenderer
     * @param {ButtonElement} ButtonElement
     * @param {{events: *|string[]}} [opts]
     */
    renderCommentsForm: function renderCommentsForm(ButtonElement, opts) {

      opts = opts || {};

      /**
       * Define button store
       * @memberOf CommentsRenderer
       * @type {{}}
       */
      this.$buttons = {};

      if (!opts.visible) {

        this.view.scope.logger.debug('Restrict to render comments');
        return false;
      }

      /**
       * Define default events
       * @type {string[]}
       */
      var defaultEvents = ['focus', 'blur'];

      /**
       * Define events
       * @type {*|string[]}
       */
      var events = this.base.isDefined(opts.events) ?
          (this.base.isArray(opts.events) ?
              opts.events : [opts.events]).concat(defaultEvents) :
          defaultEvents;

      this.$.append(
          this.renderTextArea({
            name: 'comment',
            placeholder: 'Add a comment...',
            disabled: false,
            visible: true,
            validate: false,
            style: 'no-transition',
            monitor: {
              events: events,
              callback: this.doActionEvent.bind({
                scope: this,
                events: events
              })
            }
          })
      );

      this.renderButtons(ButtonElement);
    },

    renderButtons: function renderButtons(ButtonElement) {

      /**
       * Define buttons
       * @type {{
             *      cancel: {text: string, events: {click: string}},
             *      post: {text: string, events: {click: string}}
             * }}
       */
      var buttons = {
        post: {
          text: 'Post comment',
          events: {
            click: 'postComment'
          }
        },
        cancel: {
          text: 'Cancel',
          events: {
            click: 'cancelComment'
          }
        }
      };

      /**
       * Define buttons container
       * @type {*|jQuery|HTMLElement}
       */
      var $container = $('<ul class="buttons" />');

      $.each(buttons, function each(i, button) {
        button.$container = $container;
      });

      this.view.button(
          ButtonElement,
          buttons,
          this.$buttons
      );

      this.$.append($container.hide());
    },

    /**
     * Define show buttons
     * @memberOf CommentsRenderer
     * @param {boolean} show
     */
    showButtons: function showButtons(show) {
      this.$buttons.cancel.$container[show ? 'show' : 'hide']();
    },

    /**
     * Define action event
     * @memberOf CommentsRenderer
     * @param {Event} e
     */
    doActionEvent: function doActionEvent(e) {

      /**
       * Get method name
       * @type {string}
       */
      var methodName = '_' + e.type + 'CommentsEvent';

      if (this.scope[methodName]) {
        this.scope[methodName](e)
      }
    },

    /**
     * Define on focus event
     * @memberOf CommentsRenderer
     * @param {Event} e
     * @private
     */
    _focusCommentsEvent: function _focusCommentsEvent(e) {

      this.showButtons(true);
    },

    /**
     * Define on blur event
     * @memberOf CommentsRenderer
     * @param {Event} e
     * @private
     */
    _blurCommentsEvent: function _blurCommentsEvent(e) {

      if (e.target.textLength === 0) {
        this.showButtons(false);
      }
    }
  });
});