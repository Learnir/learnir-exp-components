import { newSpecPage } from '@stencil/core/testing';
import { EmbedComponent } from '../embed-component';

describe('embed-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EmbedComponent],
      html: `<embed-component></embed-component>`,
    });
    expect(page.root).toEqualHtml(`
      <embed-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </embed-component>
    `);
  });
});
