/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'config/listeners/application.listeners',
  'config/listeners/workspace.listeners',
  'config/listeners/page.listeners',
  'config/listeners/layout.listeners',
  'config/listeners/widget.listeners',
  'modules/Logger'
], function defineListeners(Application, Workspace, Page, Layout, Widget,
    Logger) {

  /**
   * Define logger instance
   * @type {Logger}
   */
  var logger = new Logger({
    config: {
      logger: {
        show: true,
        namespaces: false,
        type: {
          debug: false,
          log: false,
          info: false,
          error: true,
          warn: true
        }
      }
    }
  });

  logger.puts.bind(logger, 'debug')(
      'Define local listeners', [
        Application.prototype.localListeners,
        Workspace.prototype.localListeners,
        Page.prototype.localListeners,
        Layout.prototype.localListeners,
        Widget.prototype.localListeners
      ]
  );
});