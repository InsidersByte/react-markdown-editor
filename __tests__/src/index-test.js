/* eslint-env jest */

jest.unmock('../../src');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MarkdownEditor from '../../src';

const value = '';
const onChangeMock = jest.genMockFunction();
const onImageDropMock = jest.genMockFunction();

let markdownEditor;

const validFile = [{ type: 'image/jpeg', name: 'image' }];
const invalidFile = [{ type: 'text/markdown', name: 'markdown' }];
const uploadedImage = { url: 'url', filename: 'image' };

function generateMarkdownEditor(includeOnDropImage = false) {
    const markup = includeOnDropImage ?
        <MarkdownEditor value={value} onChange={onChangeMock} onImageDrop={onImageDropMock} /> :
        <MarkdownEditor value={value} onChange={onChangeMock} />;

    return TestUtils.renderIntoDocument(
        markup
    );
}

function simulateDrop(files, useDataTransfer = true) {
    TestUtils.Simulate.drop(
        TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
        { [useDataTransfer ? 'dataTransfer' : 'target']: { files } }
    );
}

describe('MarkdownEditor', () => {
    beforeEach(() => {
        markdownEditor = generateMarkdownEditor();
        onChangeMock.mockClear();
        onImageDropMock.mockClear();
    });

    it('renders', () => {
        const markdownEditorNode = ReactDOM.findDOMNode(markdownEditor);

        expect(markdownEditorNode).toBeDefined();
        expect(markdownEditorNode).not.toBe(null);

        expect(markdownEditor.state.draggingOver).toBe(false);
    });

    describe('onDragEnter', () => {
        it('sets draggingOver to true', () => {
            expect(markdownEditor.state.draggingOver).toBe(false);

            TestUtils.Simulate.dragEnter(TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'));

            expect(markdownEditor.state.draggingOver).toBe(true);
        });
    });

    describe('onDragLeave', () => {
        it('sets draggingOver to false', () => {
            markdownEditor.setState({ draggingOver: true });

            TestUtils.Simulate.dragLeave(TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'));

            expect(markdownEditor.state.draggingOver).toBe(false);
        });
    });

    describe('onDrop', () => {
        it('sets draggingOver to false', () => {
            markdownEditor.setState({ draggingOver: true });

            simulateDrop(validFile);

            expect(markdownEditor.state.draggingOver).toBe(false);
        });

        describe('valid images, but no onImageDrop prop passed', () => {
            it('does not call onChange', () => {
                expect(onChangeMock).not.toBeCalled();

                simulateDrop(validFile);

                expect(onChangeMock).not.toBeCalled();
            });
        });

        describe('onImageDrop prop passed', () => {
            beforeEach(() => {
                markdownEditor = generateMarkdownEditor(true);

                expect(onChangeMock).not.toBeCalled();
                expect(onImageDropMock).not.toBeCalled();
            });

            describe('invalid files', () => {
                afterEach(() => {
                    expect(onChangeMock).not.toBeCalled();
                    expect(onImageDropMock).not.toBeCalled();
                });

                describe('no files passed', () => {
                    it('does not call onChange or onImageDrop', () => {
                        simulateDrop([]);
                    });
                });

                describe('no images passed', () => {
                    it('does not call onChange or onImageDrop', () => {
                        simulateDrop(invalidFile);
                    });
                });
            });

            describe('invalid response from onImageDrop', () => {
                afterEach(() => {
                    simulateDrop(validFile);

                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });

                describe('no filename', () => {
                    it('does not call onChange twice', () => {
                        onImageDropMock.mockReturnValueOnce({ url: 'url' });
                    });
                });

                describe('no url', () => {
                    it('does not call onChange twice', () => {
                        onImageDropMock.mockReturnValueOnce({ filename: 'filename' });
                    });
                });
            });

            describe('one image passed', () => {
                beforeEach(() => {
                    onImageDropMock.mockReturnValueOnce(uploadedImage);
                });

                afterEach(() => {
                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });

                it('calls onChange and onImageDrop', () => {
                    simulateDrop(validFile);
                });

                describe('one image passed with event.target.files', () => {
                    it('calls onChange and onImageDrop', () => {
                        simulateDrop(validFile, false);
                    });
                });
            });
        });
    });
});
