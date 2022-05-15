import { Component, Host, h, Prop, Watch, getAssetPath } from '@stencil/core';

@Component({
  tag: 'reward-component',
  styleUrl: 'reward-component.css',
  shadow: true,
})
export class RewardComponent {

  @Prop() data: object;
  @Prop() consumer: string;
  @Prop() options; // quiz options

  @Prop() submit: Function;
  @Prop() request: Function;
  @Prop() reset: Function;
  @Prop() submitted: boolean;
  @Prop() callback: () => void; // call by some components for completetion events, transfer of data etc.
  // @Prop() loading: boolean;

  @Watch('submitted')
  HandleSubmitChanges() {
    // console.log('got old_submmited: ', old_submmited);
    // console.log('got new_submitted: ', new_submitted);
  }

  Quizzed = () => {

    let submit = () => {
      this.submit({ identifier: `${this.data["id"]}-${this.consumer}`, ...this.data }).then(() => {
        this.submitted = true;
      }).catch(() => {
        this.submitted = false;
      })
    }

    let exactness_validation = (answer, response) => {
      if (answer && response) {
        return answer.toLowerCase().replaceAll(' ', '') === response.toLowerCase().replaceAll(' ', '');
      }
    };

    switch (this.data["comp"]) {
      // single-choice response
      case this.options[0].id:
        return (
          <div>
            {!this.submitted ?
              <div>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    {block.answers.map((answer, index1) => (
                      <div key={index1} class="form-check mt-2 align-items-center">
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
                <button class="mt-4" onClick={() => {
                  let allow = this.data["blocks"].every(block => block.choice !== undefined);
                  allow ? submit() : alert("Please select an answer for all the questions");
                }}>Submit</button>
                <p class="mt-3"> {this.consumer ? "" : "Identification not present, please contact support"} </p>
              </div>
              :
              <div>
                <h3 class="">You have completed this quiz successfully 🏆</h3>
                <p class="mb-3"> Your interaction data for this quiz has been saved successfully. </p>

                <h4 class="mt-3"> Your score: </h4>
                <p class="mt-1">
                  {this.data["blocks"].filter(block => block.answer == block.choice).length} of {this.data["blocks"].length} Correct ({Math.round(this.data["blocks"].filter(block => block.answer == block.choice).length / this.data["blocks"].length * 100)}%)
                </p>

                <h4 class="mt-3"> The Answers: </h4>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    {block.answers.map((answer, index1) => (
                      <div key={index1} class="form-check mt-2 align-items-center">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`block-${index}`}
                          id="flexRadioDefault2"
                          value={answer}
                          checked={block.answer === index1}
                        />
                        <label class="form-check-label" id={`${block.answer == index1 ? "" : "dimmed"}`} htmlFor="flexRadioDefault2"> {answer}</label>
                      </div>
                    ))}
                  </div>
                ))}
                <button class="mt-4" onClick={() => { this.submitted = false; this.reset(); }}>Reset this quiz?</button>
              </div>
            }
          </div>
        )
      // written response
      case this.options[1].id:
        const imageSrc = getAssetPath(`./assets/icons/info-circled.svg`);
        return (
          <div>
            {!this.submitted ?
              <div class="row">

                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4 col-12" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    <div class="written-response mt-2 align-items-center">
                      {/* <label class="form-check-label" htmlFor="flexRadioDefault2">Response</label> */}
                      <textarea
                        class="response-textarea"
                        name={`block-${index}`}
                        id="flexRadioDefault2"
                        value={block.answer}
                        placeholder="Response ..."
                        onInput={(e) => {
                          let blocks = this.data["blocks"];
                          blocks[index].answer = e.target["value"]; // set the users answer to the block index
                          this.data = { ...this.data, blocks };
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div class="w-100 col-12">
                  <button class="mt-4" onClick={() => {
                    let allow = this.data["blocks"].every(block => block.answer);
                    allow ? submit() : alert("Please fill in all answers for the questions");
                  }}>Submit</button>
                  <p class="mt-3"> {this.consumer ? "" : "Identification not present, please contact support"} </p>
                </div>

              </div>
              :
              <div>
                <h3 class="">You have completed this quiz successfully 🏆</h3>
                <p class="mb-3"> Your interaction data for this quiz has been saved successfully. </p>

                <h4 class="mt-3"> Feedback below: </h4>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4 col-12" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    <div class="written-response mt-2 align-items-center">
                      {/* <label class="form-check-label" htmlFor="flexRadioDefault2">Response</label> */}
                      <textarea
                        class="response-textarea"
                        name={`block-${index}`}
                        id="flexRadioDefault2"
                        value={block.answer}
                        placeholder="Response ..."
                        onInput={(e) => {
                          let blocks = this.data["blocks"];
                          blocks[index].answer = e.target["value"]; // set the users answer to the block index
                          this.data = { ...this.data, blocks };
                        }}
                      />
                    </div>

                    <div class="border p-2 written-response bg-light-green">
                      {block.scoring == "exact" ?
                        <p class={`d-flex align-items-center ${exactness_validation(block.answer, block.response) ? "" : "text-danger"}`} >
                          <img class='me-1' src={imageSrc} />
                          {exactness_validation(block.answer, block.response) ? `Answer is correct (${block.answer})` : "Answer is incorrect"}
                        </p>
                        :
                        <p class="d-flex align-items-center">
                          <img class='me-1' src={imageSrc} /> Feedback is {block.response}
                        </p>
                      }
                    </div>

                  </div>
                ))}

                <button class="mt-4" onClick={() => { this.submitted = false; this.reset(); }}>Reset this quiz?</button>
              </div>
            }

          </div>
        )
      // multi-choice response
      case this.options[2].id:
        return (
          <div>
            {!this.submitted ?
              <div>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    {block.answers.map((answer, index1) => (
                      <div key={index1} class="form-check mt-2 align-items-center">
                        <input
                          class="form-check-input mt-2"
                          type="checkbox"
                          name={`block-${index}-${index1}`}
                          id={`block-${index}-${index1}`}
                          value={answer}
                          checked={block?.choice?.includes(answer) ? true : false}
                          onInput={() => {
                            let blocks = this.data["blocks"];
                            // if block[index] choice dosent exist
                            // create the new choice and push
                            if (!blocks[index].choice) {
                              blocks[index].choice = [answer]; // set the users answer to the block index
                            } else {
                              // check if removal or addition
                              // removal if the answer is already in choice
                              if (blocks[index].choice.includes(answer)) {
                                blocks[index].choice = blocks[index].choice.filter(ans => ans !== answer)
                              } else {
                                // addition
                                blocks[index].choice = [...block.choice, answer]; // set the users answer to the block index
                              }
                            }

                            this.data = { ...this.data, blocks };
                          }}
                        />
                        <label class="form-check-label" htmlFor={`block-${index}-${index1}`}>{answer}</label>
                      </div>
                    ))}
                  </div>
                ))}
                <button class="mt-4" onClick={() => {
                  let allow = this.data["blocks"].every(block => block.choice.length > 0);
                  allow ? submit() : alert("Please select an answer for all the questions");
                }}>Submit</button>
                <p class="mt-3"> {this.consumer ? "" : "Identification not present, please contact support"} </p>
              </div>
              :
              <div>
                <h3 class="">You have completed this quiz successfully 🏆</h3>
                <p class="mb-3"> Your interaction data for this quiz has been saved successfully. </p>

                <h4 class="mt-3"> Your score: </h4>
                <p class="mt-1">
                  {
                    this.data["blocks"].filter((block) => {
                      let lengths = block.answer.length == block.choice.length;
                      let difference = block.answer.filter(x => !block.choice.includes(x));
                      return lengths == true && difference.length == 0;
                    }).length} of {this.data["blocks"].length} Correct
                  ({Math.round(this.data["blocks"].filter(block => {
                    let lengths = block.answer.length == block.choice.length;
                    let difference = block.answer.filter(x => !block.choice.includes(x));
                    return lengths == true && difference.length == 0;
                  }).length / this.data["blocks"].length * 100)}%)
                </p>

                <h4 class="mt-3"> The Answers: </h4>
                {this.data["blocks"].map((block, index) => (
                  <div class="mt-4" key={index}>
                    <h5 class="mb-2"> {block.question} </h5>
                    {block.answers.map((answer, index1) => (
                      <div key={index1} class="form-check mt-2 align-items-center">
                        <input
                          class="form-check-input mt-2"
                          type="checkbox"
                          name={`block-${index}-${index1}`}
                          id={`block-${index}-${index1}`}
                          value={answer}
                          checked={block?.answer?.includes(answer) ? true : false}
                          disabled={block?.answer?.includes(answer) ? false : true}
                        />
                        <label class="form-check-label" htmlFor={`block-${index}-${index1}`}>{answer}</label>
                      </div>
                    ))}
                  </div>
                ))}
                <button class="mt-4" onClick={() => { this.submitted = false; this.reset(); }}>Reset this quiz?</button>
              </div>
            }
          </div>
        )
      default:
        return (
          <div>
            <p> The component data was recieved, but learnir-exp-module dosen't have the view for it. </p>
            <p> Please develop the component view or if your a learner(wild that this happened, send us a screenshot here team@learnir.co) </p>
          </div>
        )
    }
  }

  render() {
    return (
      <Host>

        {!this.submitted && <div>
          <h3 class=""> {this.data["title"]} </h3>
          <p class="mt-0"> {this.data["summary"]} </p>
        </div>}
        {this.Quizzed()}

      </Host>
    );
  }
}
