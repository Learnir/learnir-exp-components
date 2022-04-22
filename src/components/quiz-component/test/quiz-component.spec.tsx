import { newSpecPage } from '@stencil/core/testing';
import { QuizComponent } from '../quiz-component';

describe('quiz-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QuizComponent],
      html: `<quiz-component></quiz-component>`,
    });
    expect(page.root).toEqualHtml(`
      <quiz-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </quiz-component>
    `);
  });
});
