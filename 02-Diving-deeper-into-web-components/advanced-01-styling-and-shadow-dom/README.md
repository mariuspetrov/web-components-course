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
