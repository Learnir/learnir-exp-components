import { Component, Host, h, Prop, State } from '@stencil/core';
import axios from 'axios';
import { local } from '../../utils/utils';

import '@spectrum-web-components/bundle/elements.js';


@Component({
  tag: 'learnir-exp',
  styleUrl: 'learnir-exp.css',
  shadow: true,
})
export class LearnirExp {

  @Prop() component: string;
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

  componentWillLoad() {
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
        <slot>
          <div class="learnir-exp">
            {this.loading ?
              <div class="loading-component">
                <p> Loading... </p>
              </div>
              :
              <div class="loaded-component">
                {this.data ? this.Componenter() : <p> This learning component is currently not present, please check for your internet and contact support. </p>}
              </div>
            }
          </div>
        </slot>
      </Host>
    );
  }

}
