# ::slotted Pseudo-element in Web Components

The `::slotted` pseudo-element is used in conjunction with **Shadow DOM** in Web Components to style the children of a `<slot>` element. A `<slot>` allows external content to be projected into the Shadow DOM from the light DOM (the regular DOM outside the shadow boundary). While styles defined inside a Shadow DOM usually can't affect elements projected into it, `::slotted` enables targeting those slotted elements.

## Syntax

```css
::slotted(selector) {
  /* Styles */
}
```

## Key Points

- **Slot Usage**: The `::slotted` pseudo-element only applies to elements that are distributed into a `<slot>` of a Shadow DOM. It can't be used for arbitrary styling in the light DOM.

- **Single Level**: You can only style direct children of the `<slot>` using `::slotted`. You cannot use it to style descendants of a slotted element. For example, you can style a slotted `<div>`, but not a child `<p>` inside that `<div>`.

- **Selector**: You can pass a specific selector inside `::slotted` to target particular slotted elements. For example, `::slotted(p)` will style slotted `<p>` tags.


```html
<template id="shadow-template">
  <style>
    ::slotted(span) {
      color: red; /* Targets slotted <span> elements */
    }
  </style>
  <slot></slot> <!-- Content from light DOM will be projected here -->
</template>

<div id="shadow-host"></div>

<script>
  const template = document.querySelector('#shadow-template');
  const shadowHost = document.querySelector('#shadow-host');
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(template.content.cloneNode(true));
</script>
```

```html
<div id="shadow-host">
  <span>This is a slotted span</span>
  <p>This is a slotted paragraph</p>
</div>
```

In this example:

- Only the slotted `<span>` element will be styled (in red) because of `::slotted(span)`.
- The `<p>` will not be affected, as it is not a `<span>`.

### Notes:
- `::slotted` only applies to elements passed into a Web Component via a `<slot>`.
- Styling only affects the immediate children of a `<slot>` element and not deeper descendants.


<br>
<br>
<br>


# The `:host` CSS Pseudo-class

The `:host` CSS pseudo-class is used within the Shadow DOM to target the **host element** (the element that contains the Shadow DOM). This allows you to style the host element itself from inside the Shadow DOM.

## Key Use Case

The `:host` is particularly useful in **Web Components** to apply styles to the component's outer wrapper, enabling encapsulation and a scoped way of styling your components without affecting the global styles.

### Example

```css
/* Inside a Web Component's Shadow DOM */
:host {
  display: block;
  background-color: lightgrey;
}
```

## Key Points

- **Host Element**: The `:host` pseudo-class refers to the element that encapsulates the Shadow DOM, allowing styles from within the Shadow DOM to apply to the host.
- **Isolation**: Normally, styles defined inside the Shadow DOM don't affect the host element, but `:host` bridges that gap, making it possible to style the host from inside the Shadow DOM.
- **Conditional Styling**: You can pass a selector to `:host` to apply styles conditionally, based on attributes, classes, or states of the host element.

## Example: Using `:host` in a Web Component

The following example demonstrates how to use the `:host` pseudo-class to style a Web Component's host element from within the Shadow DOM. It includes styles for the host element, conditional styling based on attributes and classes, and how to attach a Shadow DOM to an element.

### HTML & JavaScript

```html
<template id="shadow-template">
  <style>
    :host {
      display: block;
      border: 2px solid blue;
    }

    :host([disabled]) {
      opacity: 0.5;
    }

    :host(.highlighted) {
      background-color: yellow;
    }
  </style>
  <div>Shadow DOM content</div>
</template>

<div id="shadow-host" class="highlighted"></div>

<script>
  const template = document.querySelector('#shadow-template');
  const shadowHost = document.querySelector('#shadow-host');
  const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(template.content.cloneNode(true));
</script>
```

### Explanation

- The `<template>` element defines the **Shadow DOM** content, including styles and HTML.
- The `:host` pseudo-class is used to style the host element (in this case, the `<div id="shadow-host">`):
  - By default, the host element is given a `block` display and a blue border.
  - When the `disabled` attribute is present on the host element, its opacity is reduced to `0.5`.
  - If the host element has the `highlighted` class, its background color becomes yellow.
- The `<script>` attaches the Shadow DOM to the `#shadow-host` element and clones the content from the template into the Shadow DOM.


### Variants

- **`:host()` with a selector**: You can style the host element conditionally based on an attribute or class:

  ```css
    :host([attribute]) {
      /* Styles when the host element has the attribute */
    }
  ```

- **`:host-context()`**: This allows styling the host element based on conditions in the light DOM (outside the Shadow DOM):

  ```css
  :host-context(.parent-class) {
    /* Styles when the host is inside an element with .parent-class */
  }

### Summary

In summary, `:host` is a powerful tool for styling the outer wrapper of a Web Component from inside the Shadow DOM, ensuring a clean separation of internal and external styles.
