import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'embed-component',
  styleUrl: 'embed-component.css',
  shadow: true,
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
