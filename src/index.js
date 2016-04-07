import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextArea from 'react-textarea-autosize';

const imageType = /^image\//;
const placeholderTemplate = (filename) => `![uploading ${filename}...]()`;
const uploadedTemplate = (filename, url) => `![${filename}](${url})`;

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            draggingOver: false,
        };

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onDragEnter() {
        this.setState({ draggingOver: true });
    }

    onDragLeave() {
        this.setState({ draggingOver: false });
    }

    onImageDrop(event) {
        event.preventDefault();

        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const filesArray = [...files];
        const images = filesArray.filter(o => imageType.test(o.type));
        const imageFileNames = images.map(o => placeholderTemplate(o.name));
        const imagePlaceholders = imageFileNames.join('\n');

        this.props.onChange({
            target: {
                value: `${this.props.value}\n${imagePlaceholders}`,
            },
        });

        for (const image of images) {
            Promise
                .resolve(this.props.onImageDrop(image))
                .then(({ filename, url }) => {
                    if (!filename || !url) {
                        return;
                    }

                    const templateString = placeholderTemplate(filename);
                    const uploadedString = uploadedTemplate(filename, url);
                    const value = this.props.value.replace(templateString, uploadedString);

                    this.props.onChange({
                        target: {
                            value,
                        },
                    });
                });
        }
    }

    render() {
        const textAreaClassName = this.state.draggingOver ? 'dragover' : null;

        return (
            <div className="markdown-editor">
                <div>
                    <h2>Markdown</h2>

                    <TextArea
                        className={textAreaClassName}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onDrop={this.onImageDrop}
                        onDragEnter={this.onDragEnter}
                        onDragLeave={this.onDragLeave}
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
