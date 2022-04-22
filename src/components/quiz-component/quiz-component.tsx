import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'quiz-component',
  styleUrl: 'quiz-component.css',
  shadow: true,
})
export class QuizComponent {

  @Prop() data: object;
  @Prop() consumer: string;
  @Prop() options; // quiz options
  @Prop() submit: Function;
  @Prop() submitted: boolean;

  // based on the quiz id, we can render the right type of quiz
  // based on the quiz component data, we can setup the answers and send back for evaluation

  // the flow happens per quiz block
  // on submission, we save the response object of the component
  // we then tag the consumer to the component

  private SubmitQuiz = () => {
    // handle data-checks
    // check if all component blocks have the choice setup
    // check if consumer is true
    let allow = this.data["blocks"].every(block => block.choice !== undefined);
    if (allow) {
      this.submit({ identifier: `${this.data["id"]}-${this.consumer}`, ...this.data }); // component+consumer
    } else {
      alert("Your interaction data/answers aren't valid")
    }
  }


  // if submitted is true, render the submitted page instead
  // find how many of the component answers match the choice
  Quizzed = () => {
    let index = 0;
    switch (this.data["comp"]) {
      case this.options[index].id: // single choice answering
        return (
          <div>
            {!this.submitted ?
              <div>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4" key={index}>
                    <h6 class="mb-3 text-bold"> {block.question} </h6>

                    {block.answers.map((answer, index1) => (
                      <div key={index1} class="form-check mt-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`block-${index}`}
                          id="flexRadioDefault2"
                          value={answer}
                          checked={block.answers[block.answer].choice === index1}
                          onInput={() => {
                            let blocks = this.data["blocks"];
                            blocks[index].choice = index1; // set the users answer to the block index
                            this.data = { ...this.data, blocks };
                          }}
                        />
                        <label class="form-check-label" htmlFor="flexRadioDefault2">{answer}</label>
                      </div>
                    ))}
                  </div>
                ))}
                <button type="button" class="btn btn-primary mt-4" onClick={this.SubmitQuiz}>Submit</button>
                <p class="text-small mt-3"> {this.consumer ? "" : "Identification not present, please contact support"} </p>
              </div>
              :
              <div>
                <h3 class="mt-4">You have completed this quiz successfully 🏆</h3>
                <p class="text-small mb-4"> Your interaction data for this quiz has been saved successfully. </p>

                <h4 class="text-small mt-5"> Your score: </h4>
                <p class="text-small mt-1">
                  {this.data["blocks"].filter(block => block.answer == block.choice).length} of {this.data["blocks"].length} Correct ({Math.round(this.data["blocks"].filter(block => block.answer == block.choice).length / this.data["blocks"].length * 100)}%)
                </p>


                <h4 class="text-small mt-5"> The Answers: </h4>
                <p class="text-small mt-1">
                  {/* Render questions,  */}
                </p>

              </div>
            }
          </div>
        )
      case this.options[index = +1].id: // multi choice answering
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
          {!this.submitted && <div>
            <h3 class=""> {this.data["title"]} </h3>
            <p class="mt-0"> {this.data["summary"]} </p>
          </div>}

          {this.Quizzed()}
        </slot>
      </Host>
    );
  }

}
