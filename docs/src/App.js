import React, { Component } from 'react';
import MarkdownEditor from '@insidersbyte/react-markdown-editor';
import './App.css';

class App extends Component {
  state = {
    markdown: '# This is a H1  \n## This is a H2  \n###### This is a H6',
  };

  handleChange = event => {
    this.setState({ markdown: event.target.value });
  };

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

export default App;
