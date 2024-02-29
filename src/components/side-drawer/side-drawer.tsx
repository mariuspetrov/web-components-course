// This allows you to create Stencil components using the Component decorator and the h function for creating virtual DOM elements.
import { Component, h } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer'
})
export class SideDrawer {
  render() {
    return (
      <div>
        <h1>The Side Drawer</h1>
      </div>
    );
  }
}
