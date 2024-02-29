// This allows you to create Stencil components using the Component decorator and the h function for creating virtual DOM elements.
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true
})
export class SideDrawer {
  // reflects that the title has changed on the DOM element attribute
  @Prop({reflect: true}) title: string;

  render() {
    return (
      <aside>
        <header><h1>{this.title}</h1></header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
