# react-markdown-editor

[![npm (scoped)](https://img.shields.io/npm/v/@insidersbyte/react-markdown-editor.svg)](https://www.npmjs.com/package/@insidersbyte/react-markdown-editor)  
[![Build Status](https://travis-ci.org/InsidersByte/react-markdown-editor.svg)](https://travis-ci.org/InsidersByte/react-markdown-editor)
[![Coverage Status](https://coveralls.io/repos/github/InsidersByte/react-markdown-editor/badge.svg?branch=master)](https://coveralls.io/github/InsidersByte/react-markdown-editor?branch=master)
[![Code Climate](https://codeclimate.com/github/InsidersByte/react-markdown-editor/badges/gpa.svg)](https://codeclimate.com/github/InsidersByte/react-markdown-editor)  
[![Dependency Status](https://david-dm.org/insidersbyte/react-markdown-editor.svg)](https://david-dm.org/insidersbyte/react-markdown-editor)
[![peerDependency Status](https://david-dm.org/insidersbyte/react-markdown-editor/peer-status.svg)](https://david-dm.org/insidersbyte/react-markdown-editor#info=peerDependencies)
[![devDependency Status](https://david-dm.org/insidersbyte/react-markdown-editor/dev-status.svg)](https://david-dm.org/insidersbyte/react-markdown-editor#info=devDependencies)

[![NPM](https://nodei.co/npm/@insidersbyte/react-markdown-editor.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@insidersbyte/react-markdown-editor/)

[React](http://facebook.github.io/react) Markdown editor with preview and drag and drop image support (at the moment it always adds the image to the end, regardless of where you drop it), built with [react-markdown-renderer](https://github.com/insidersbyte/react-markdown-renderer).

## Demo
http://insidersbyte.github.io/react-markdown-editor

## Installing

```bash
npm install @insidersbyte/react-markdown-editor
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import '@insidersbyte/react-markdown-editor/dist/css/react-markdown-editor.css';

class App extends React.Component {
    constructor() {
            super();
    
            this.state = {
                markdown: '# This is a H1  \n## This is a H2  \n###### This is a H6',
            };
    
            this.updateMarkdown = this.updateMarkdown.bind(this);
        }
    
        onImageDrop(file) {
            // This is where you would upload your files to whatever storage you are using
            // You just need to return a promise with the original filename and the url of the uploaded file
        
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        filename: file.name,
                        url: 'http://images.freeimages.com/images/previews/b56/hands-2-ok-hand-1241594.jpg',
                    });
                }, 3000);
            });
        }
    
        updateMarkdown(event) {
            this.setState({ markdown: event.target.value });
        }
    
        render() {
            return (
                <MarkdownEditor
                    value={this.state.markdown}
                    onChange={this.updateMarkdown}
                    onImageDrop={this.onImageDrop}
                />
            );
        }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## Props

* value (*string*) - the raw markdown that will be converted to html (**required**)
* onChange (*function*) - called when a change is made (**required**)
* onImageDrop (*function*) - called per image dropped on the textarea

## Contributing

Contributions are very welcome!

Please note that by submitting a pull request for this project, you agree to license your contribution under the [MIT License](https://github.com/insidersbyte/react-markdown-editor/blob/master/LICENSE) to this project.

## License

Published under the [MIT License](https://github.com/insidersbyte/react-markdown-editor/blob/master/LICENSE).
