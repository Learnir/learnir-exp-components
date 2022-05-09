import { newE2EPage } from '@stencil/core/testing';

describe('embed-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<embed-component></embed-component>');

    const element = await page.find('embed-component');
    expect(element).toHaveClass('hydrated');
  });
});
