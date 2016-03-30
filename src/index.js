import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import TextArea from 'react-textarea-autosize';

function MarkdownEditor(props) {
    return (
        <div className="markdown-editor">
            <div>
                <h2>Markdown</h2>

                <TextArea value={props.value} onChange={props.onChange} />
            </div>

            <div>
                <h2>Preview</h2>

                <MarkdownRenderer className="markdown-editor__preview" markdown={props.value} />
            </div>
        </div>
    );
}

MarkdownEditor.propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
};

MarkdownEditor.defaultProps = {
    onChange: () => {},
};

export default MarkdownEditor;
