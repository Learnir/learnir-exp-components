import { Component, Host, h, Prop } from '@stencil/core';

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
  tag: 'embed-component',
  styleUrl: 'embed-component.css',
  scoped: true,
})
export class EmbedComponent {
  @Prop() data: object;
  @Prop() consumer: string;
  @Prop() options; // quiz options

  @Prop() submit: Function;
  @Prop() request: Function;
  @Prop() submitted: boolean;

  // takes the data and renders the project into an iframe

  // render iframe with width-100 and height 100
  render() {
    return (
      <Host>

        <div>
          <h3 class=""> {this.data["title"]} </h3>
          <p class="mt-0"> {this.data["summary"]} </p>
        </div>

        {this.data["blocks"][0]?.link ?
          <iframe src={this.data["blocks"][0]?.link} style={{ "border": "none", width: "100%", height: "100%", minHeight: "600px" }} title="Iframe Example"></iframe>
          :
          <p class="mt-0"> Iframe rendering link not found </p>
        }

      </Host>
    );
  }

}
