import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import axios from 'axios';
import { local, learnirSDK } from '../../utils/utils';

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

if (!local) {
  Sentry.init({
    dsn: "https://34e64e4b44cf4a8998aa4a6394c76009@o1171719.ingest.sentry.io/6360199",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

@Component({
  tag: 'reward-component',
  styleUrl: 'reward-component.css',
  shadow: true,
})
export class RewardComponent {

  @Prop() data: object;
  @Prop() consumer: string;
  @Prop() box: string;
  @Prop() key: string;
  @Prop() options; // quiz options

  @Prop() endpoint: string;

  @Prop() submit: Function;
  @Prop() request: Function;
  @Prop() reset: Function;
  @Prop() submitted: boolean;
  @Prop() callback: () => void; // call by some components for completetion events, transfer of data etc.

  @State() loading: boolean;
  @State() completed: boolean;
  @State() uncompleted_sections = [];

  @Watch('submitted')
  HandleSubmitChanges() {
  }

  // base data, learning events data - helps us determine if student has completed all box sections
  // component data ++ - helps us determine configuration and what the base data is
  // interaction data ++ - helps us determine if component already has data stored
  // above 2 handled automatically, whether to determine by completion of all sections, determined by above


  // 

  LearningCompletionData() {
    this.loading = true;

    let learnirClient = learnirSDK(this.key);

    if (learnirClient && this.key) {
      learnirClient.records(this.consumer).then(events_response => {
        learnirClient.content().then(content_response => {

          // find box learner is learning
          let match = content_response.data.filter(choice => choice.id === this.box["id"]);
          let box = match.length > 0 ? match[0] : null;

          if (box) {
            // get sections completed
            let sections_completed = [];
            events_response.data["events"].forEach(event => {
              if (event.event_name == "section.complete" && event.event_context.box === box.id) {
                sections_completed.push(event.event_context.section);
              }
            });

            // validate box complete or not
            let completions = [...new Set(sections_completed)];
            let all_sections_completed = box["sections"].every(section => completions.includes(section.id));
            if (all_sections_completed) {
              // consumer has completed the box
              this.completed = true;
            } else {
              // consumer has not completed the box
              this.completed = false;
              this.uncompleted_sections = box["sections"].map(section => !completions.includes(section.id));
            }
          }else{
            this.completed = false;
          }

        })
      })
    }
  }

  componentWillLoad() {
    this.LearningCompletionData();
  }

  RewardView = () => {

    // let submit = () => {
    //   this.submit({ identifier: `${this.data["id"]}-${this.consumer}`, ...this.data }).then(() => {
    //     this.submitted = true;
    //   }).catch(() => {
    //     this.submitted = false;
    //   })
    // }

    // if consumer has completed = show the button to submit the recieval confirmation

    // show which sections haven't been completed
    // inform the consumer to complete those sections

    switch (this.data["comp"]) {
      // certifications response
      case this.options[0].id:
        return (
          <div>
            {!this.submitted ?
              <div>
                <h3 class="">Certification Recieval 🏆</h3>
                {/* // completed or not */}
                {this.completed ?
                  <div class="mt-4">
                  </div>
                  :
                  <div class="mt-4">
                    <h5 class="">You still have these sections to recieve this certification:</h5>

                    {this.uncompleted_sections.map((section, index) => (
                      <div key={index} class="mt-2">
                        <p>{section.title}</p>
                      </div>
                    ))}
                  </div>
                }

                {/* {this.data["blocks"].map((block, index) => (
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
                <p class="mt-3"> {this.consumer ? "" : "Identification not present, please contact support"} </p> */}
              </div>
              :
              <div>
                <h3 class="">You have completed this quiz successfully 🏆</h3>
                <p class="mb-3"> Your interaction data for this quiz has been saved successfully. </p>
                {/* 
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
                <button class="mt-4" onClick={() => { this.submitted = false; this.reset(); }}>Reset this quiz?</button> */}
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

        {this.RewardView()}
      </Host>
    );
  }
}
