# Web Components Lifecycle Hooks

Web Components have lifecycle hooks defined by the **Custom Elements API** that allow you to control their behavior at different stages of their existence, such as creation, updates, and removal.

## Lifecycle Hooks

### 1. `constructor`

**Description**:  
Called when a new instance of the custom element is created. It’s where you can set up initial state, properties, or create a shadow DOM.

**Usage**:  
Use the constructor to initialize the element’s internal structure and attach any necessary child elements or shadow DOM.

```javascript
class MyElement extends HTMLElement {
  constructor() {
    super(); // Always call super first.
    this.attachShadow({ mode: 'open' }); // Optional shadow DOM.
    console.log('Element created');
  }
}
```

### 2. `connectedCallback`

**Description**:  
Called when the custom element is inserted into the DOM. This is where you set up the element's behavior that requires it to be part of the document, such as adding event listeners or fetching data.

**Usage**:  
Use this hook to initialize tasks that depend on the DOM, like setting up event listeners or rendering dynamic content.

```javascript
connectedCallback() {
  console.log('Element added to the DOM');
  this.shadowRoot.innerHTML = '<p>Hello World</p>';
}
```

**Example Use Cases**:
Fetching external data when the element is added to the page.
Setting up event listeners on child elements.
Rendering content that relies on being attached to the DOM.


### 3. `disconnectedCallback`

**Description**:  
Called when the custom element is removed from the DOM. It’s useful for cleaning up, such as removing event listeners, stopping intervals, or releasing resources to avoid memory leaks.

**Usage**:  
Use this hook to perform any cleanup tasks, like removing event listeners or timers, when the element is detached from the document.

```javascript
disconnectedCallback() {
  console.log('Element removed from the DOM');
  // Cleanup code here, like removing event listeners or stopping timers.
}
```

**Example Use Cases**:
Removing event listeners added in connectedCallback.
Stopping timers or animations.
Freeing resources or cancelling network requests.


### 4. `attributeChangedCallback(name, oldValue, newValue)`

**Description**:  
Called when one of the element’s observed attributes changes. This is useful when you need to respond to attribute changes and update the component’s internal state or UI.

**Usage**:  
This hook is triggered whenever a change is made to an attribute that you specify in the `observedAttributes` getter. You can use it to react to the changes, such as updating the content or re-rendering parts of the UI.

```javascript
static get observedAttributes() {
  return ['data-title']; // List of attributes to observe
}

attributeChangedCallback(name, oldValue, newValue) {
  console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
  if (name === 'data-title') {
    this.shadowRoot.innerHTML = `<h1>${newValue}</h1>`; // Update UI when data-title changes
  }
}
```

**Example Use Cases**:
Automatically updating the content or style of the element when an attribute changes.
Triggering side effects like network requests when specific attributes are modified.
Synchronizing the state of the element with external properties.


### 5. `adoptedCallback`

**Description**:  
Called when the custom element is moved to a new document (e.g., when an element is moved between iframes or from one document to another). This hook allows you to handle any logic related to this transition.

**Usage**:  
Use this hook to perform actions that are necessary when the element changes documents, such as adjusting styles or resetting certain state.

```javascript
adoptedCallback() {
  console.log('Element moved to a new document');
  // Handle any necessary updates when the element is adopted by a new document
}
```

**Example Use Cases**:
Reinitializing resources or styles that are specific to the document.
Handling changes that depend on the document context, such as event listeners or styles.
Managing any cross-document dependencies or resetting the component's state.

## Full Example
Here’s how you can use all these hooks together:

```javascript
class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    console.log('Constructor called');
  }

  connectedCallback() {
    console.log('Connected to the DOM');
    this.render();
  }

  disconnectedCallback() {
    console.log('Disconnected from the DOM');
  }

  static get observedAttributes() {
    return ['data-message'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed`);
    if (name === 'data-message') {
      this.render();
    }
  }

  adoptedCallback() {
    console.log('Element adopted into a new document');
  }

  render() {
    this.shadowRoot.innerHTML = `<p>${this.getAttribute('data-message') || 'Hello!'}</p>`;
  }
}

customElements.define('my-custom-element', MyCustomElement);
```

## Summary of Web Components Lifecycle Hooks

- **`constructor`**: Initializes the element.
- **`connectedCallback`**: Called when the element is added to the DOM.
- **`disconnectedCallback`**: Called when the element is removed from the DOM.
- **`attributeChangedCallback`**: Invoked when an observed attribute changes.
- **`adoptedCallback`**: Invoked when the element is moved to a new document.
