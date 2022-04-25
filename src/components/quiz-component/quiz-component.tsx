import { Component, Host, h, Prop, Watch } from '@stencil/core';

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://34e64e4b44cf4a8998aa4a6394c76009@o1171719.ingest.sentry.io/6360199",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

@Component({
  tag: 'quiz-component',
  styleUrl: 'quiz-component.css',
  scoped: true,
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
                <button class="mt-4" onClick={submit}>Submit</button>
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
                <button class="mt-4" onClick={() => { this.submitted = false; this.request(); }}>Want to redo this quiz?</button>
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
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh">
        </link>
        <link rel="stylesheet" href="/build/learnir-exp-module/learnir-exp-module.css" />
        <link rel="stylesheet" href="/dist/learnir-exp-module/learnir-exp-module.css" />
        <link rel="stylesheet" href="/build/learnir-exp-module.css" />


        {!this.submitted && <div>
          <h3 class=""> {this.data["title"]} </h3>
          <p class="mt-0"> {this.data["summary"]} </p>
        </div>}
        {this.Quizzed()}

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
      </Host>
    );
  }

}
