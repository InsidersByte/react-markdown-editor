# react-markdown-editor

[![Build Status](https://travis-ci.org/InsidersByte/react-markdown-editor.svg)](https://travis-ci.org/InsidersByte/react-markdown-editor)  
[![Dependency Status](https://david-dm.org/insidersbyte/react-markdown-editor.svg)](https://david-dm.org/insidersbyte/react-markdown-editor)
[![peerDependency Status](https://david-dm.org/insidersbyte/react-markdown-editor/peer-status.svg)](https://david-dm.org/insidersbyte/react-markdown-editor#info=peerDependencies)
[![devDependency Status](https://david-dm.org/insidersbyte/react-markdown-editor/dev-status.svg)](https://david-dm.org/insidersbyte/react-markdown-editor#info=devDependencies)

[React](http://facebook.github.io/react) Markdown editor, built with [react-markdown-renderer](https://github.com/insidersbyte/react-markdown-renderer).

## Demo
http://insidersbyte.github.io/react-markdown-renderer

## Installing

```bash
npm install @InsidersByte/react-markdown-editor
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownEditor from 'react-markdown-editor';
import 'react-markdown-editor/css/react-markdown-editor.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            markdown: '# This is an H1  \n## This is an H2  \n###### This is an H6',
        };

        this.updateMarkdown = this.updateMarkdown.bind(this);
    }

    updateMarkdown(event) {
        this.setState({ markdown: event.target.value });
    }

    render() {
        return (
            <MarkdownEditor value={this.state.markdown} onChange={this.updateMarkdown} />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## Props

* value (*string*) - the raw markdown that will be converted to html (**required**)
* onChange (*function*) - css classes to add to the component (**required**).

## Contributing

Contributions are very welcome!

Please note that by submitting a pull request for this project, you agree to license your contribution under the [MIT License](https://github.com/insidersbyte/react-markdown-editor/blob/master/LICENSE) to this project.

## License

Published under the [MIT License](https://github.com/insidersbyte/react-markdown-editor/blob/master/LICENSE).
