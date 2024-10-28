# Stencil Component Lifecycle Hooks

Stencil, a modern compiler for building Web Components, extends the standard Web Component lifecycle with additional hooks. These lifecycle hooks make it easier to control the component's behavior and manage setup, updates, and teardown.

## Lifecycle Hooks Overview

### 1. `componentWillLoad`
- **Purpose**: Called once, just before the component is rendered for the first time.
- **Example Use**: Fetching initial data, initializing component properties, or preparing computed values.

```javascript
componentWillLoad() {
  console.log('Component is about to load');
  this.data = await fetchData();
}
```

### 2. `componentDidLoad`
- **Purpose**: Called once, after the component has rendered for the first time.
- **Example Use**: Initializing third-party libraries, measuring DOM, or adding event listeners.

```javascript
componentDidLoad() {
  console.log('Component has loaded');
  this.initializeThirdPartyLib();
}
```

### 3. `componentWillRender`
- **Purpose**: Called before every re-render (but not for the initial render).
- **Example Use**: Preparing data before each re-render based on state or props changes.

```javascript
componentWillRender() {
  console.log('Component will re-render');
  this.prepareRenderData();
}
```

### 4. `componentDidRender`
- **Purpose**: Called after every re-render (but not after the initial render).
- **Example Use**: Updating external UI libraries or triggering animations based on DOM updates.

```javascript
componentDidRender() {
  console.log('Component has re-rendered');
  this.updateDomDependentState();
}
```

### 5. `componentWillUpdate`
- **Purpose**: Called before the component updates due to `state` or `props` changes (not for the initial render).
- **Example Use**: Preparing or adjusting state based on upcoming changes.

```javascript
componentWillUpdate() {
  console.log('Component will update');
  this.adjustDataForUpdates();
}
```

### 6. `componentDidUpdate`
- **Purpose**: Called after the component updates due to changes in `state` or `props`.
- **Example Use**: Responding to state or property changes with side effects, such as updating external libraries.

```javascript
componentDidUpdate() {
  console.log('Component did update');
  this.refreshDataAfterUpdate();
}
```

### 7. `disconnectedCallback`
- **Purpose**: Called when the component is removed from the DOM.
- **Example Use**: Cleaning up resources, removing event listeners, or freeing memory.

```javascript
disconnectedCallback() {
  console.log('Component has been removed from the DOM');
  this.cleanup();
}
```

### 8. `attributeChangedCallback`
- **Purpose**: Called when a watched attribute changes. Stencil typically handles this via `@Prop` decorators.
- **Example Use**: Responding to attribute changes without needing to re-render the whole component.

```javascript
attributeChangedCallback(name, oldValue, newValue) {
  console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
}
```

### 9. `render`
- **Purpose**: The render method defines the JSX or HTML structure of the component.
- **Example**:

```javascript
render() {
  return (
    <div>
      <p>Hello, {this.name}</p>
    </div>
  );
}
```

## Summary
Stencil's lifecycle hooks provide fine-grained control over component rendering, allowing you to manage setup, updates, and teardown efficiently. Leveraging these hooks makes it easier to handle complex interactions and dependencies within your components.
