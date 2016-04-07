import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownEditor from '../src';
import '../src/react-markdown-editor.styl';

import './app.styl';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            markdown: '# This is a H1  \n## This is a H2  \n###### This is a H6',
        };

        this.updateMarkdown = this.updateMarkdown.bind(this);
    }

    onImageDrop(file) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    filename: file.name,
                    url: 'http://images.freeimages.com/images/previews/b56/hands-2-ok-hand-1241594.jpg',
                });
            }, 1000);
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
