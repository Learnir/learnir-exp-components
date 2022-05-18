import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

import axios from 'axios';
import { production } from '../../utils/utils';
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
  tag: 'learnir-exp-module',
  styleUrl: 'learnir-exp-module.css',
  scoped: true,
})

export class LearnirExpModule {

  @Prop({ mutable: true }) component: string;
  @Prop() consumer: string;
  @Prop() port_key: string;
  @Prop() box: string;
  // @Prop() callback: (event_name: string) => void;


  @State() data: object; // gotten from request to api server
  @State() loading: boolean;
  @State() submitted: boolean = false;

  @State() endpoint: string = production ? "https://api.learnir.co/v1" : "http://localhost:9060/v1";
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
            id: "b55246a3-3895-4176-849d-dfec15cf698d",
            title: "Written Response",
            description: "Given a question, your learner will fill in their thoughts via an open field"
          },
          {
            id: "530461b3-e3a5-430c-a792-c164dd4ffee3",
            title: "Multi Choice",
            description: "Given a question, your learner will select multiple answers to match as the answer"
          },
        ]
      },
      {
        id: "embed",
        image: "/images/components/quiz1.webp",
        title: "Embed Types",
        description: "Embed all types of pages into an iframe component. e.g Forms etc",
        children: [
          {
            id: "6c90cc8f-4895-4370-bdae-b0b1647a9dea",
            title: "Single Insert",
            description: "Copy and paste your page here and it will be rendered",
            credit: { name: "CockroachLabs", logo: "https://console.learnir.co/images/cockroachlabs.png" }
          }
        ]
      },
      {
        id: "reward",
        image: "/images/components/quiz1.webp",
        title: "Reward Types",
        description: "Reward your learner with all types of mediums, from certs to real life goodies",
        children: [
          {
            id: "6c90cc8f-4895-4370-bdae-b0b1647a9dea",
            title: "Certifications",
            description: "Select from a variety of certifications to award to your Learners",
            credit: { name: "CockroachLabs", logo: "/images/cockroachlabs.png", url: "https://www.cockroachlabs.com/" }
          }
        ]
      }
    ]
  };

  @Event() callback: EventEmitter<string>;

  CallBack = (event_name) => {
    if (this.callback) {
      this.callback.emit(event_name);
      console.log("exp-callback-called");
    } else {
      console.log("this.callback", this.callback);
      console.log("exp-callback-not-present");
    }
  }

  LoadComponentData() {
    this.loading = true;
    axios.get(`${this.endpoint}/integration/module/component/${this.component}`).then(response => {
      this.data = response.data;
      axios.get(`${this.endpoint}/integration/module/component/interaction/${this.component}-${this.consumer}`).then(response => {
        this.data = response.data;
        this.submitted = true;
        this.loading = false;
      }).catch(() => {
        this.submitted = false;
        this.loading = false;
      });
    }).catch(() => {
      this.loading = false;
    })
  }


  @Watch('component')
  watchPropHandler(newValue: string) {
    this.component = newValue;
    this.LoadComponentData();
  }

  componentWillLoad() {
    this.CallBack("section.visit");
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


    let ResetInteractionData = () => {
      this.loading = true;
      axios.delete(`${this.endpoint}/integration/module/component/interaction/${this.component}-${this.consumer}`).then(response => {
        this.data = response.data;
        this.LoadComponentData(); // this will reload the component
      }).catch(() => {
        this.submitted = false;
        this.loading = false;
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
          reset={ResetInteractionData}
          submitted={this.submitted}
          callback={this.CallBack}
        ></quiz-component>);
      case "embed":
        return (<embed-component
          data={this.data}
          consumer={this.consumer}
          options={this.components["children"][1].children}
          submit={SubmitInteractionData}
          request={GetInteractionData}
          submitted={this.submitted}
          callback={this.CallBack}
        ></embed-component>)
      case "reward":
        return (<reward-component
          data={this.data}
          consumer={this.consumer}
          box={this.box}
          port_key={this.port_key}
          options={this.components["children"][2].children}
          submit={SubmitInteractionData}
          request={GetInteractionData}
          reset={ResetInteractionData}
          callback={this.CallBack}
          endpoint={this.endpoint}
          submitted={this.submitted}
        ></reward-component>);
    }
  }

  render() {
    return (
      <Host>
        <div class={`learnir-exp ${production ? "p-4" : ""}`}>
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
      </Host>
    );
  }

}
