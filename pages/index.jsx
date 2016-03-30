import React from 'react';
import ReactDOM from 'react-dom';

import MarkdownEditor from '../src';

import './app.styl';

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
