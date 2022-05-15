import { newSpecPage } from '@stencil/core/testing';
import { RewardComponent } from '../reward-component';

describe('reward-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RewardComponent],
      html: `<reward-component></reward-component>`,
    });
    expect(page.root).toEqualHtml(`
      <reward-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reward-component>
    `);
  });
});
