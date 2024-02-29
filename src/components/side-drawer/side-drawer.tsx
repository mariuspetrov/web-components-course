// This allows you to create Stencil components using the Component decorator and the h function for creating virtual DOM elements.
import { Component, h } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true
})
export class SideDrawer {
  render() {
    return (
      <aside>
        <h1>The Side Drawer</h1>
      </aside>
    );
  }
}
