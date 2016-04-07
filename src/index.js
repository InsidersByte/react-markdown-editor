import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextArea from 'react-textarea-autosize';

const imageType = /^image\//;

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);

        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onImageDrop(event) {
        event.preventDefault();

        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const filesArray = [...files];
        const images = filesArray.filter(o => imageType.test(o.type));
        const imageFileNames = images.map(o => `![${o.name}]()`);
        const imagePlaceholders = imageFileNames.join('\n');

        this.props.onChange({
            target: {
                value: `${this.props.value}\n${imagePlaceholders}`,
            },
        });
    }

    render() {
        return (
            <div className="markdown-editor">
                <div>
                    <h2>Markdown</h2>

                    <TextArea
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onDrop={this.onImageDrop}
                    />
                </div>

                <div>
                    <h2>Preview</h2>

                    <MarkdownRenderer
                        className="markdown-editor__preview"
                        markdown={this.props.value}
                    />
                </div>
            </div>
        );
    }
}

MarkdownEditor.propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onImageDrop: React.PropTypes.func,
};

MarkdownEditor.defaultProps = {
    onChange: () => {},
    onImageDrop: () => {},
};

export default MarkdownEditor;
