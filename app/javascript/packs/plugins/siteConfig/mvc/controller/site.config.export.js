/**
 * @class SiteConfigExport
 */
export class SiteConfigExport {

  /**
   * Export site data
   * @memberOf SiteConfigExport
   */
  exportSiteData() {

    const root = this.controller.root(),
        setting = root.model.setting,
        ns = setting.getNameSpace();

    const fName = [ns, root.model.getUUID()].join('-');

    root.view.renderExportLink({
      type: 'text/json',
      fileName: fName + '.json',
      content: JSON.stringify(
          setting.decompress(
              setting.getStorage().getItem([ns])
          )
      ),
      title: 'Export JSON',
      autoload: true
    });
  }
}