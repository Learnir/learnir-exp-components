import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import axios from 'axios';
import { local } from '../../utils/utils';

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
  tag: 'learnir-exp-module',
  styleUrl: 'learnir-exp-module.css',
  scoped: true,
})
export class LearnirExpModule {

  @Prop({ mutable: true }) component: string;
  @Prop() consumer: string;

  @State() data: object; // gotten from request to api server
  @State() loading: boolean;
  @State() submitted: boolean = false;

  @State() endpoint: string = local ? "http://localhost:9060/v1" : "https://api.learnir.co/v1";;
  @State() components: object = {
    title: "Visual Component",
    description: "(Think quizes, final course section certification, Commerce to recieve payments etc) - Anything visual your learners will interact with.",
    children: [
      {
        id: "quiz",
        image: "/images/components/quiz1.webp",
        title: "Quiz Types",
        description: "Quiz your learners using unique types of quizes",
        collection: [
          {
            id: "2d265b8a-40f3-480a-9ee4-22678569e8bb",
            title: "Single Choice",
            description: "Given a question, your learner will select one single choice as the answer"
          },
          {
            id: "81299b35-98a7-4215-8633-becb304d243b",
            title: "Multiple Choice",
            description: "Given a question, your learner will select multiple choices together as the answer"
          },
          {
            id: "b55246a3-3895-4176-849d-dfec15cf698d",
            title: "Written Response",
            description: "Given a question, your learner will fill in their thoughts via an open field"
          },
          {
            id: "b55246a3-3895-4176-849d-dfec15cf698d",
            title: "Fill in Blank",
            description: "Given a sentence, your learner will complete it by filling in the right word."
          },
        ]
      }
    ]
  };


  LoadComponentData() {
    this.loading = true;
    axios.get(`${this.endpoint}/integration/module/component/${this.component}`).then(response => {
      this.data = response.data;
      this.loading = false;
      axios.get(`${this.endpoint}/integration/module/component/interaction/${this.component}-${this.consumer}`).then(response => {
        this.data = response.data;
        this.submitted = true;
      }).catch(() => {
        this.submitted = false;
      });
    }).catch(() => {
      this.loading = false;
    })
  }

  // when the component props changes
  // get the new value
  // then call for new data

  @Watch('component')
  watchPropHandler(newValue: string) {
    this.component = newValue;
    this.LoadComponentData();
  }

  componentWillLoad() {
    this.LoadComponentData();
  }

  Componenter = () => {
    let SubmitInteractionData = (data) => {
      return new Promise((resolve, reject) => {
        axios.post(`${this.endpoint}/integration/module/component/interaction`, data).then(response => {
          this.data = response.data;
          this.submitted = true;
          resolve(response);
        }).catch((error) => {
          this.submitted = false;
          reject(error);
        });
      })
    };

    let GetInteractionData = () => {
      axios.get(`${this.endpoint}/integration/module/component/interaction/${this.component}-${this.consumer}`).then(response => {
        this.data = response.data;
        this.submitted = true;
      }).catch(() => {
        this.submitted = false;
      });
    };

    switch (this.data["component"]) {
      case "quiz":
        return (<quiz-component
          data={this.data}
          consumer={this.consumer}
          options={this.components["children"][0].collection}
          submit={SubmitInteractionData}
          request={GetInteractionData}
          submitted={this.submitted}
        ></quiz-component>)
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

        <div class="learnir-exp">
          {this.loading ?
            <div class="loading-component">
              <p> Loading... </p>
            </div>
            :
            <div class="loaded-component">
              {this.data ? this.Componenter() : <p> This learning component is currently not present, please check for your internet connection and contact support. </p>}
            </div>
          }
        </div>

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
      </Host>
    );
  }

}
