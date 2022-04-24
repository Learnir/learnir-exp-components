import { Component, Host, h, Prop, Watch } from '@stencil/core';

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
  @Prop() request: Function;
  @Prop() submitted: boolean;

  @Watch('submitted')
  HandleSubmitChanges() {
    // console.log('got old_submmited: ', old_submmited);
    // console.log('got new_submitted: ', new_submitted);
  }

  Quizzed = () => {
    let submit = () => {
      let allow = this.data["blocks"].every(block => block.choice !== undefined);
      if (allow) {
        this.submit({ identifier: `${this.data["id"]}-${this.consumer}`, ...this.data }).then(() => {
          this.submitted = true;
        }).catch(() => {
          this.submitted = false;
        })
      } else {
        alert("Your interaction data/answers aren't valid")
      }
    }
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
                <button class="btn btn-primary mt-4" onClick={submit}>Submit</button>
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
                            checked={block.answer === index1}
                          />
                          <label class="form-check-label" htmlFor="flexRadioDefault2">
                            {block.answer === index1 ? answer : <s>{answer}</s>}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </p>
                <button class="btn btn-primary mt-4" onClick={() => { this.submitted = false; this.request(); }}>Want to redo this quiz?</button>
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
