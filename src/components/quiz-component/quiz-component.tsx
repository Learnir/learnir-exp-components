import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'quiz-component',
  styleUrl: 'quiz-component.css',
  shadow: true,
})
export class QuizComponent {

  @Prop() component: object;
  @Prop() collection;

  // based on the quiz id, we can render the right type of quiz
  // based on the quiz component data, we can setup the answers and send back for evaluation

  // the flow happens per quiz block
  // on submission, we save the response object of the component
  // we then tag the consumer to the component

  private handleInput = (ev: Event) => {
    console.log('handle input')
  }

  
  private handleClick = (ev: Event) => {
    // this works
    console.log('handle click')
  }

  Quizzed = () => {
    let index = 0;
    switch (this.component["comp"]) {
      case this.collection[index].id: // single choice answering
        return (
          <div>
            {this.component["blocks"].map((block, index) => (
              <div class="mt-4 border" key={index}>
                <h6 class="mb-3 text-bold"> {block.question} </h6>

                {block.answers.map((answer, index) => (
                  <div key={index} class="form-check mt-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onClick={this.handleClick}
                      onInput={this.handleInput}
                    />
                    <label class="form-check-label" htmlFor="flexRadioDefault2">{answer}</label>
                  </div>
                ))}
              </div>
            ))}

            <button type="button" class="btn btn-primary mt-4">Submit</button>

          </div>
        )
      case this.collection[index = +1].id: // multi choice answering
        return (
          <div>
            <p> Multi Choice... </p>
          </div>
        )
      default:
        return (
          <div>
            <p> Default component </p>
          </div>
        )
    }
  }

  render() {
    return (
      <Host>
        <slot>

          <h3 class=""> {this.component["title"]} </h3>
          <p class="mt-0"> {this.component["summary"]} </p>

          {this.Quizzed()}

        </slot>
      </Host>
    );
  }

}
