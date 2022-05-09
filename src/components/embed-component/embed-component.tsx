import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'embed-component',
  styleUrl: 'embed-component.css',
  shadow: true,
})
export class EmbedComponent {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
