import {Page} from '../../app/javascript/packs/core/config/page';
import {Layout} from '../../app/javascript/packs/core/config/layout';

describe('Create Layout', () => {

  it('and so is a spec', async () => {
    const page = await new Page({});
    expect(page.api).toBeDefined();
    expect(page.model).toBeDefined();
    expect(page.model.getConfig('order')).toBe(1);
    const layout = await new Layout({}, page);
  });
});