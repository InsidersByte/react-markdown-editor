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
                expect(onChangeMock.mock.calls.length).toBe(0);

                simulateDrop(validFile);

                expect(onChangeMock.mock.calls.length).toBe(0);
            });
        });

        describe('onImageDrop prop passed', () => {
            beforeEach(() => {
                markdownEditor = generateMarkdownEditor(true);

                expect(onChangeMock.mock.calls.length).toBe(0);
                expect(onImageDropMock.mock.calls.length).toBe(0);
            });

            describe('invalid files', () => {
                afterEach(() => {
                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);
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
                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });

                describe('no filename', () => {
                    it('does not call onChange twice', () => {
                        onImageDropMock.mockReturnValueOnce({ url: 'url' });

                        simulateDrop(validFile);
                    });
                });

                describe('no url', () => {
                    it('does not call onChange twice', () => {
                        onImageDropMock.mockReturnValueOnce({ filename: 'filename' });

                        simulateDrop(validFile);
                    });
                });
            });

            describe('one image passed', () => {
                afterEach(() => {
                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });

                it('calls onChange and onImageDrop', () => {
                    onImageDropMock.mockReturnValueOnce(uploadedImage);

                    simulateDrop(validFile);
                });

                describe('one image passed with event.target.files', () => {
                    it('calls onChange and onImageDrop', () => {
                        onImageDropMock.mockReturnValueOnce(uploadedImage);

                        simulateDrop(validFile, false);
                    });
                });
            });
        });
    });
});
