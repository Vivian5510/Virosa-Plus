# Using Crepe Editor

Crepe is a powerful, feature-rich Markdown editor built on top of Milkdown. It provides a complete editing experience with a beautiful UI and extensive customization options.

## Why Choose Crepe?

***

* 🚀 **Ready to Use**: Works out of the box with sensible defaults

* 🎨 **Beautiful UI**: Modern design with multiple theme options

* 🔧 **Highly Customizable**: Extensive configuration options

* 📦 **Feature Complete**: Includes all essential Markdown editing features

* 🛠️ **Extensible**: Built on Milkdown's plugin system

## Quick Start

***

### Installation
# Using npm
npm install @milkdown/crepe

# Using yarn
yarn add @milkdown/crepe

# Using pnpm
pnpm add @milkdown/crepe

Basic Usage

import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

// Choose your preferred theme

// Create editor instance
const crepe = new Crepe({
  root: document.getElementById("app"),
  defaultValue: "# Hello, Crepe!\n\nStart writing your markdown...",
});

// Initialize the editor
await crepe.create();

// Clean up when done
crepe.destroy();

## Themes

***

Crepe comes with several beautiful themes out of the box:

### Light Themes

* `frame` - Modern frame-based design

* `classic` - Traditional editor look

* `nord` - Clean, minimal Nord color scheme

### Dark Themes

* `frame-dark` - Dark version of frame theme

* `classic-dark` - Dark version of classic theme

* `nord-dark` - Dark version of nord theme

To use a theme:
// Import base styles first
import "@milkdown/crepe/theme/common/style.css";
// Then import your chosen theme
import "@milkdown/crepe/theme/frame.css";

### Custom Themes

You can create your own theme by extending the base styles. Check out the [existing themes](https://github.com/Milkdown/milkdown/tree/main/packages/crepe/src/theme) for reference.

## Features

***

Crepe includes a comprehensive set of features that can be enabled or disabled as needed.

### Feature Configuration

> **Note**: For any configuration that ends with `Icon` (like `boldIcon`, `linkIcon`, etc.), you can use either a string or an SVG element. This applies to all icon configurations throughout Crepe's features.


const crepe = new Crepe({
  features: {
    // Disable specific features
    [Crepe.Feature.CodeMirror]: false,
    [Crepe.Feature.Table]: false,
  },
  featureConfigs: {
    // Configure feature behavior
    [Crepe.Feature.LinkTooltip]: {
      inputPlaceholder: "Enter URL...",
    },
  },
});

### Available Features

#### 1. Code Editor (`CodeMirror`)

Syntax highlighting and editing for code blocks with language support, theme customization, and preview capabilities.

#### 2. List Management (`ListItem`)

Support for bullet lists, ordered lists, and todo lists with customizable icons and formatting.

#### 3. Link Management (`LinkTooltip`)

Enhanced link editing and preview with customizable tooltips, edit/remove actions, and copy functionality.

#### 4. Image Handling (`ImageBlock`)

Image upload and management with resizing, captions, and support for both inline and block images.

#### 5. Block Editing (`BlockEdit`)

Drag-and-drop block management and slash commands for quick content insertion and organization.

#### 6. Table Support (`Table`)

Full-featured table editing with row/column management, alignment options, and drag-and-drop functionality.

#### 7. Toolbar (`Toolbar`)

Formatting toolbar for selected text with customizable icons and actions.

#### 8. Cursor (`Cursor`)

Enhanced cursor experience with drop cursor and gap cursor for better content placement.

#### 9. Placeholder (`Placeholder`)

Document or block level placeholders to guide users when content is empty.

#### 10. Latex (`Latex`)

Mathematical formula support with both inline and block math rendering using KaTeX.

For detailed configuration options of each feature, please refer to the [API documentation](/docs/api/crepe).

## Editor Instance Methods

***

#### `crepe.editor`

Access the underlying Milkdown editor instance.


const editor = crepe.editor;
editor.use(customPlugin);
editor.action(insert("Hello"));

#### `crepe.create()`

Initialize the editor.

await crepe.create();

#### `crepe.destroy()`

Clean up the editor instance.

```typescript
```
crepe.destroy();

#### `crepe.setReadonly(value: boolean)`

Toggle readonly mode.

```typescript
```
crepe.setReadonly(true); // Make editor read-only
crepe.setReadonly(false); // Make editor editable

#### `crepe.on`

Add event listeners.

```typescript
```
crepe.on((listener) => {
  listener.markdownUpdated((markdown) => {
    console.log("Markdown updated:", markdown);
  });

  listener.updated((doc) => {
    console.log("Document updated");
  });

  listener.focus(() => {
    console.log("Editor focused");
  });

  listener.blur(() => {
    console.log("Editor blurred");
  });
});

#### `crepe.getMarkdown()`

Get current markdown content.


const markdown = crepe.getMarkdown();

# Using Plugins

All features in milkdown are provided by plugin.
Such as syntax, components, etc.
Now we can try more plugins:

import { Editor } from "@milkdown/kit/core";
import { slash } from "@milkdown/kit/plugin/slash";
import { tooltip } from "@milkdown/kit/plugin/tooltip";
import { commonmark } from "@milkdown/kit/preset/commonmark";

Editor.make().use(commonmark).use(tooltip).use(slash).create();

## Toggling Plugins

You can also toggle plugins programmatically:

import { Editor } from "@milkdown/kit/core";
import { someMilkdownPlugin } from "some-milkdown-plugin";

const editor = await Editor.config(configForPlugin)
  .use(someMilkdownPlugin)
  .create();

// remove plugin
await editor.remove(someMilkdownPlugin);

// remove config
editor.removeConfig(configForPlugin);

// add another plugin
editor.use(anotherMilkdownPlugin);

// Recreate the editor to apply changes.
await editor.create();

## Official Plugins

Milkdown provides the following official plugins:

### Plugins provided by `@milkdown/kit`:

> 🙋‍♀️Why not all plugins are available in `@milkdown/kit`?
>
> `@milkdown/kit` is a collection of plugins that are commonly used in the editor.
> If you want to use a plugin that is not in `@milkdown/kit`, you can install it separately.
> The plugins in `@milkdown/kit` are also stable and well-tested.

| Package Name                                                   | Description                                               |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| [@milkdown/kit/preset/commonmark](/docs/api/preset-commonmark) | Add [commonmark](https://commonmark.org/) syntax support. |
| [@milkdown/kit/preset/gfm](/docs/api/preset-gfm)               | Add [gfm](https://github.github.com/gfm/) syntax support. |
| [@milkdown/kit/plugin/history](/docs/api/plugin-history)       | Add undo & redo support.                                  |
| [@milkdown/kit/plugin/clipboard](/docs/api/plugin-clipboard)   | Add markdown copy & paste support.                        |
| [@milkdown/kit/plugin/cursor](/docs/api/plugin-cursor)         | Add drop & gap cursor.                                    |
| [@milkdown/kit/plugin/listener](/docs/api/plugin-listener)     | Add listener support.                                     |
| [@milkdown/kit/plugin/indent](/docs/api/plugin-indent)         | Add tab indent support.                                   |
| [@milkdown/kit/plugin/upload](/docs/api/plugin-upload)         | Add drop and upload support.                              |
| [@milkdown/kit/plugin/block](/docs/api/plugin-block)           | Add a drag handle for every block node.                   |
| [@milkdown/kit/plugin/tooltip](/docs/api/plugin-tooltip)       | Add universal tooltip support.                            |
| [@milkdown/kit/plugin/slash](/docs/api/plugin-slash)           | Add universal slash commands support.                     |

### Other Plugins:

* [@milkdown/plugin-collab](/docs/api/plugin-collab)

  Add collaborative editing support, powered by [yjs](https://docs.yjs.dev/).

* [@milkdown/plugin-prism](/docs/api/plugin-prism)

  Add [prism](https://prismjs.com/) support for code block highlight.

* [@milkdown/plugin-emoji](/docs/api/plugin-emoji)

  Add emoji shortcut support (something like `:+1:`), and use [twemoji](https://twemoji.twitter.com/) to display emoji.

## Community plugins

Check out [awesome-milkdown](https://github.com/Milkdown/awesome-milkdown) to find community plugins. You can also submit a PR to list your plugins there.

# React Integration

Milkdown provides first-class React support with dedicated packages and hooks for seamless integration. You can choose between Crepe, our feature-rich WYSIWYG editor, or the core Milkdown editor for more customization options.

## Using Crepe

***

Crepe is a powerful, feature-rich Markdown editor built on top of Milkdown that provides a more user-friendly editing experience.

### Installation

```bash
```

npm install @milkdown/crepe @milkdown/react @milkdown/kit

Implementation


import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

const CrepeEditor: React.FC = () => {
  const { get } = useEditor((root) => {
    return new Crepe({ root });
  });

  return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC = () => {
  return (
    <MilkdownProvider>
      <CrepeEditor />
    </MilkdownProvider>
  );
};

Using Milkdown

For more advanced use cases or when you need full control over the editor's configuration, you can use the core Milkdown editor directly.

### Install Dependencies


npm install @milkdown/react @milkdown/kit

### Basic Usage

Here's a minimal example to get started:

import { Editor, rootCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";

const MilkdownEditor: React.FC = () => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(commonmark),
  );

  return <Milkdown />;
};

export const MilkdownEditorWrapper: React.FC = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};

## Advanced Usage

***

### Accessing Editor Instance

The `useInstance()` hook can only be used within components that are children of `MilkdownProvider`. It returns a tuple containing a loading state and a getter function to access the editor instance.

import { useInstance } from "@milkdown/react";

// ❌ This won't work - ParentComponent is outside MilkdownProvider
const ParentComponent: React.FC = () => {
  const [isLoading, getInstance] = useInstance(); // This will be [true, () => undefined]
  return <MilkdownEditorWrapper />;
};

// ✅ This is the correct way - EditorControls is inside MilkdownProvider
const EditorControls: React.FC = () => {
  const [isLoading, getInstance] = useInstance();

  const handleSave = () => {
    if (isLoading) return;

    const editor = getInstance();
    if (!editor) return;

    const content = editor.getMarkdown();
    // Do something with the content
  };

  return (
    <button onClick={handleSave} disabled={isLoading}>
      Save
    </button>
  );
};

// ✅ Proper component structure
const EditorWithControls: React.FC = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditorWrapper />
      <EditorControls />
    </MilkdownProvider>
  );
};

### Best Practices

1. **Component Structure**

   * Keep the editor component separate from business logic

   * Wrap the editor with `MilkdownProvider` at the highest necessary level

   * Use TypeScript for better type safety

2. **Performance**

   * Memoize the editor configuration if it's complex

   * Use React.memo for the editor component if needed

   * Avoid unnecessary re-renders of the editor

### Common Use Cases

**Form Integration**


const FormWithEditor: React.FC = () => {
  const [isLoading, getInstance] = useInstance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const editor = getInstance();
    if (!editor) return;

    const content = editor.getMarkdown();
    // Submit form with content
  };

  return (
    <form onSubmit={handleSubmit}>
      <MilkdownEditorWrapper />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

Auto-save

import { Editor, rootCtx } from "@milkdown/kit/core";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener";
import { Milkdown, useEditor } from "@milkdown/react";

const AutoSaveEditor: React.FC = () => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        // Add markdown listener for auto-save
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
          // Save content to your backend or storage
          saveToBackend(markdown);
        });
      })
      .use(commonmark)
      .use(listener),
  );

  return <Milkdown />;
};

https://github.com/Milkdown/examples