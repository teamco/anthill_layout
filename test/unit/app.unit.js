import {Page} from '../../app/javascript/packs/core/config/page';
import {Layout} from '../../app/javascript/packs/core/config/layout';

describe('Create Layout', () => {

  it('and so is a spec', async () => {
    const page1 = await new Page({});
    expect(page1.api).toBeDefined();
    expect(page1.model).toBeDefined();
    expect(page1.model.getConfig('order')).toBe(1);
    const layout1 = await new Layout({}, page1);

    const page2 = await new Page({});
    expect(page2.api).toBeDefined();
    expect(page2.model).toBeDefined();
    expect(page2.model.getConfig('order')).toBe(2);
    const layout2 = await new Layout({}, page2);
  });
});