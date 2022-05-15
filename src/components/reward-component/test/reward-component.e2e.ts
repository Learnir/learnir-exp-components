import { newE2EPage } from '@stencil/core/testing';

describe('reward-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reward-component></reward-component>');

    const element = await page.find('reward-component');
    expect(element).toHaveClass('hydrated');
  });
});
