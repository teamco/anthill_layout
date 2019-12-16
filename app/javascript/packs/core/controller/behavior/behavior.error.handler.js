/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:38 PM
 */

/**
 * Define Error handler
 * @class BehaviorErrorHandler
 */
export class BehaviorErrorHandler {

  /**
   * Define Client ErrorHandler
   * @memberOf BehaviorErrorHandler
   */
  defineClientErrorHandler() {

    const proxiedError = window.onerror,
        scope = this.scope;

    // Override previous handler.
    window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObject) => {

      if (proxiedError) {

        // Call previous handler.
        proxiedError.apply(this, arguments);
      }

      // Just let default handler run.
      scope.view.handleNotificationsRenderer({
        status: errorMsg,
        statusText: [url, lineNumber, columnNumber].join(':'),
        responseJSON: {
          error: `<pre><code>${(errorObject || {}).stack}</code></pre>`
        }
      }, 'danger');

      return false;
    };
  }

  /**
   * Define error handler
   * @memberOf BehaviorErrorHandler
   */
  _handleXhrLog(xhr, status) {

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
      let msg;
      switch (xhr.statusText) {
        case 'parsererror':
          msg = 'Requested JSON parse failed';
          break;
        case 'timeout':
          msg = 'Time out error';
          break;
        case 'abort':
          msg = 'Ajax request aborted';
          break;
        default:
          msg = `Uncaught Error. ${xhr.responseText}`;
          break;
      }
      return msg;
    }

    /**
     * Define isXhrError
     * @type {boolean}
     */
    const isXhrError = ['timeout', 'error', 'abort', 'parsererror'].indexOf(status) > -1;

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
}
  