import { newE2EPage } from '@stencil/core/testing';

describe('learnir-exp-module', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<learnir-exp-module></learnir-exp-module>');

    const element = await page.find('learnir-exp-module');
    expect(element).toHaveClass('hydrated');
  });
});
