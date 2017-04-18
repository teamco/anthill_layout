/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

define(function defineBehaviorErrorHandler() {

  /**
   * Define Error handler
   * @class BehaviorErrorHandler
   * @constructor BehaviorErrorHandler
   */
  var BehaviorErrorHandler = function BehaviorErrorHandler() {

    /**
     * Define scope
     * @property BehaviorErrorHandler
     * @type {undefined}
     */
    this.scope = undefined;
  };

  return BehaviorErrorHandler.extend('BehaviorErrorHandler', {

    /**
     * Define Client ErrorHandler
     * @memberOf BehaviorErrorHandler
     */
    defineClientErrorHandler: function defineClientErrorHandler() {

      var proxiedError = window.onerror,
          scope = this.scope;

      // Override previous handler.
      window.onerror =
          function errorHandler(errorMsg, url, lineNumber, columnNumber,
              errorObject) {

            if (proxiedError) {

              // Call previous handler.
              proxiedError.apply(this, arguments);
            }

            // Just let default handler run.
            scope.view.handleNotificationsRenderer({
              status: errorMsg,
              statusText: [url, lineNumber, columnNumber].join(':'),
              responseJSON: {
                error: [
                  '<pre><code>',
                  (errorObject || {}).stack,
                  '</code></pre>'
                ].join('')
              }
            }, 'danger');

            scope.logger.rollBarNotification('error', arguments);

            return false;
          }
    },

    /**
     * Define error handler
     * @memberOf BehaviorErrorHandler
     */
    _handleXhrLog: function _handleXhrLog(xhr, status, description) {

      /**
       * Define error message
       * @returns {string}
       * @private
       */
      function _formatStatus() {
        if (xhr.status === 0) return 'Connection refused';
        if (xhr.status === 404) return 'The requested page not found';
        if (xhr.status === 500) return 'Internal Server Error';
      }

      /**
       * Define status text
       * @returns {string}
       * @private
       */
      function _formatStatusText() {
        if (xhr.statusText ===
            'parsererror') {
          return 'Requested JSON parse failed';
        }
        if (xhr.statusText === 'timeout') return 'Time out error';
        return xhr.statusText === 'abort' ?
            'Ajax request aborted' :
            ('Uncaught Error. ' + xhr.responseText);
      }

      /**
       * Define isXhrError
       * @type {boolean}
       */
      var isXhrError = ['timeout', 'error', 'abort', 'parsererror'].indexOf(
              status) > -1;

      if (isXhrError) {
        this.scope.view.handleNotificationsRenderer({
          status: [xhr.status, _formatStatus()].join(': '),
          statusText: _formatStatusText(),
          responseJSON: xhr.responseJSON
        }, status);
      }

      this.scope.logger[isXhrError ? 'warn' : 'debug'](arguments);
      this.scope.view.get$item().hideLoader();
    }
  });
});