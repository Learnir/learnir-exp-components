import { newE2EPage } from '@stencil/core/testing';

describe('learnir-exp', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<learnir-exp></learnir-exp>');

    const element = await page.find('learnir-exp');
    expect(element).toHaveClass('hydrated');
  });
});
