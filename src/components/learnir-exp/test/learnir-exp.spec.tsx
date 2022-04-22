import { newSpecPage } from '@stencil/core/testing';
import { LearnirExp } from '../learnir-exp';

describe('learnir-exp', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LearnirExp],
      html: `<learnir-exp></learnir-exp>`,
    });
    expect(page.root).toEqualHtml(`
      <learnir-exp>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </learnir-exp>
    `);
  });
});
