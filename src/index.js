import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextArea from 'react-textarea-autosize';

const imageType = /^image\//;
const placeholderTemplate = (filename) => `![uploading ${filename}...]()`;
const uploadedTemplate = ({ filename, url }) => `![${filename}](${url})`;

export default class MarkdownEditor extends React.Component {
    static propTypes = {
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onImageDrop: React.PropTypes.func,
        options: React.PropTypes.object,
    };

    static defaultProps = {
        options: {},
    };

    state = {
        draggingOver: false,
    };

    onDragEnter = () => {
        this.setState({ draggingOver: true });
    };

    onDragLeave = () => {
        this.setState({ draggingOver: false });
    };

    onImageDrop = (event) => {
        event.preventDefault();

        this.setState({ draggingOver: false });

        if (!this.props.onImageDrop) {
            return;
        }

        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        const filesArray = [...files];
        const images = filesArray.filter(o => imageType.test(o.type));

        if (images.length === 0) {
            return;
        }

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
                    const uploadedString = uploadedTemplate({ filename, url });
                    const value = this.props.value.replace(templateString, uploadedString);

                    this.props.onChange({
                        target: {
                            value,
                        },
                    });
                });
        }
    };

    render() {
        let textAreaClassName = 'markdown-editor__textarea';

        if (this.state.draggingOver) {
            textAreaClassName += ' markdown-editor__textarea--dragover';
        }

        return (
            <div className="markdown-editor">
                <div className="markdown-editor__editor-container">
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
