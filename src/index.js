import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextArea from 'react-textarea-autosize';

export default class MarkdownEditor extends React.Component {
    static propTypes = {
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        options: React.PropTypes.object,
    };

    static defaultProps = {
        options: {},
    };

    render() {
        return (
            <div className="markdown-editor">
                <div className="markdown-editor__editor-container">
                    <h2>Markdown</h2>

                    <TextArea
                        className="markdown-editor__textarea"
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onDrop={this.onImageDrop}
                        onDragEnter={this.onDragEnter}
                        onDragLeave={this.onDragLeave}
                    />
                </div>

                <div className="markdown-editor__preview-container">
                    <h2>Preview</h2>

                    <MarkdownRenderer
                        className="markdown-editor__preview"
                        markdown={this.props.value}
                        options={this.props.options}
                    />
                </div>
            </div>
        );
    }
}
