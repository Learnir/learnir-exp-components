import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { production, learnirSDK } from '../../utils/utils';
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

if (production) {
  Sentry.init({
    dsn: "https://34e64e4b44cf4a8998aa4a6394c76009@o1171719.ingest.sentry.io/6360199",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

@Component({
  tag: 'reward-component',
  styleUrl: 'reward-component.css',
  scoped: true,
})

export class RewardComponent {

  @Prop({ mutable: true }) data: object;
  @Prop() consumer: string;
  @Prop() box: string;
  @Prop() port_key: string;
  @Prop() options; // quiz options

  @Prop() endpoint: string;

  @Prop() submit: Function;
  @Prop() request: Function;
  @Prop() reset: Function;
  @Prop({ mutable: true }) submitted: boolean;
  @Prop() callback: (event_name) => void; // call by some components for completetion events, transfer of data etc.

  @State() loading: boolean;
  @State() completed: boolean;
  @State() generating: boolean;
  @State() uncompleted_sections = [];

  @Watch('submitted')
  HandleSubmitChanges() {
  }

  // base data, learning events data - helps us determine if student has completed all box sections
  // component data ++ - helps us determine configuration and what the base data is
  // interaction data ++ - helps us determine if component already has data stored
  // above 2 handled automatically, whether to determine by completion of all sections, determined by above

  ValidateCertificationRecieval() {
    this.loading = true;
    let learnirClient = learnirSDK(this.port_key);

    if (learnirClient && this.port_key && this.box) {
      learnirClient.records(this.consumer).then(events_response => {
        learnirClient.content().then(content_response => {
          // find box learner is learning
          let match = content_response.data.filter(box => box.id == Number(this.box));
          let box = match.length > 0 ? match[0] : null;

          if (box) {

            // get sections completed
            let sections_completed = [this.data["id"]]; // include the certifications type already
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
              this.loading = false;
            } else {
              // consumer has not completed the box
              this.completed = false;
              this.uncompleted_sections = box["sections"].filter(section => !completions.includes(section.id));
              this.loading = false;
            }

          } else {
            this.completed = false;
            this.loading = false;
          }
        })
      })
    } else {
      this.loading = false;
    }
  }

  componentWillLoad() {
    switch (this.data["comp"]) {
      // certifications component
      case this.options[0].id: 
        this.ValidateCertificationRecieval();
        break;
    }
  }

  RewardView = () => {

    let submit = () => {
      this.generating = true;
      this.submit({ identifier: `${this.data["id"]}-${this.consumer}`, ...this.data }).then(() => {
        this.generating = false;
        this.submitted = true;
        this.callback("section.complete");
      }).catch(() => {
        this.generating = false;
        this.submitted = false;
      })
    }

    switch (this.data["comp"]) {
      // certifications response
      case this.options[0].id:
        return (
          <div>
            {this.loading ?
              <div class="text-center">
                <h3 class="mt-4">Checking if certificate recieval is valid 🤖</h3>
                <p class="mb-3"> Loading... </p>
              </div>
              :
              !this.submitted ?
                <div class="text-center">
                  <h3 class="mt-4">Certification Recieval 🏆</h3>
                  {this.completed ?
                    <div class="mt-2">
                      <p> Okay looks like you've completed all sections of this box</p>
                      <p> Click below to recieve your certificate</p>

                      <button class="mt-4" disabled={this.generating} onClick={() => {
                        let allow = this.completed;
                        allow ? submit() : alert("Please complete all sections to recieve certificate");
                      }}>Recieve Certificate 📜</button>

                      {this.generating && <p class="mt-3"> Generating certificate, will take a minute or two. </p>}
                    </div>
                    :
                    <div class="mt-4">
                      <h5 class="">You still have {this.uncompleted_sections.length} sections to recieve this certification:</h5>
                      {this.uncompleted_sections.map((section, index) => (
                        <div key={index} class="mt-2">
                          <p class="">{section.title}</p>
                        </div>
                      ))}
                    </div>
                  }
                </div>
                :
                <div class="text-center">
                  <h3 class="">Congrats on earning this certificate 🏆</h3>
                  <p class="mb-3"> Please download it below to have your copy </p>

                  <div class="w-100" >
                    <img src={this.data["certificate_image"]} class="certificate_image" width="70%" />
                  </div>

                  <a target="_blank" href={this.data["certificate"]} download>
                    <button class="mt-4">Download Certificate 📜</button>
                  </a>

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
        {!this.submitted && <div class="text-center">
          <h3 class=""> {this.data["title"]} </h3>
          <p class="mt-0"> {this.data["summary"]} </p>
        </div>}

        {this.RewardView()}
      </Host>
    );
  }
}
