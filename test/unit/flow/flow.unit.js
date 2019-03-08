import {Workspace} from 'config/workspace';
import {mvcExpectation, shouldBeRendered} from '../helpers/utils';

describe('Workspace', () => {

  /**
   * @constant
   * @type {Workspace}
   */
  const workspace = new Workspace({});
  workspace.view.render(true);
  mvcExpectation(workspace);

  it('Render workspace', async () => {
    shouldBeRendered(workspace, '$workspace', '$pages');
  });

  describe('Page', () => {

    /**
     * @constant page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);
    mvcExpectation(page);

    it('Render page', async () => {
      shouldBeRendered(page, '$page', '$widgets');
    });
  });
});