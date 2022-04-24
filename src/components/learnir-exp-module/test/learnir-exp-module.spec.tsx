import { newSpecPage } from '@stencil/core/testing';
import { LearnirExpModule } from '../learnir-exp-module';

describe('learnir-exp-module', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LearnirExpModule],
      html: `<learnir-exp-module></learnir-exp-module>`,
    });
    expect(page.root).toEqualHtml(`
      <learnir-exp-module>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </learnir-exp-module>
    `);
  });
});
