import { newE2EPage } from '@stencil/core/testing';

describe('quiz-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<quiz-component></quiz-component>');

    const element = await page.find('quiz-component');
    expect(element).toHaveClass('hydrated');
  });
});
