/* eslint-env jest */

jest.unmock('../../src');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MarkdownEditor from '../../src';

const value = '';
const onChangeMock = jest.genMockFunction();
const onImageDropMock = jest.genMockFunction();

const validFile = [{ type: 'image/jpeg', name: 'image' }];
const invalidFile = [{ type: 'text/markdown', name: 'markdown' }];
const uploadedImage = { url: 'url', filename: 'image' };

describe('MarkdownEditor', () => {
    beforeEach(() => {
        onChangeMock.mockClear();
        onImageDropMock.mockClear();
    });

    it('renders', () => {
        const markdownEditor = TestUtils.renderIntoDocument(
            <MarkdownEditor value={value} onChange={onChangeMock} />
        );

        const markdownEditorNode = ReactDOM.findDOMNode(markdownEditor);

        expect(markdownEditorNode).toBeDefined();
        expect(markdownEditorNode).not.toBe(null);

        expect(markdownEditor.state.draggingOver).toBe(false);
    });

    describe('onDragEnter', () => {
        it('sets draggingOver to true', () => {
            const markdownEditor = TestUtils.renderIntoDocument(
                <MarkdownEditor value={value} onChange={onChangeMock} />
            );

            expect(markdownEditor.state.draggingOver).toBe(false);

            TestUtils.Simulate.dragEnter(
                TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea')
            );

            expect(markdownEditor.state.draggingOver).toBe(true);
        });
    });

    describe('onDragLeave', () => {
        it('sets draggingOver to false', () => {
            const markdownEditor = TestUtils.renderIntoDocument(
                <MarkdownEditor value={value} onChange={onChangeMock} />
            );

            markdownEditor.setState({ draggingOver: true });

            TestUtils.Simulate.dragLeave(
                TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea')
            );

            expect(markdownEditor.state.draggingOver).toBe(false);
        });
    });

    describe('onDrop', () => {
        it('sets draggingOver to false', () => {
            const markdownEditor = TestUtils.renderIntoDocument(
                <MarkdownEditor value={value} onChange={onChangeMock} />
            );

            markdownEditor.setState({ draggingOver: true });

            TestUtils.Simulate.drop(
                TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea')
            );

            expect(markdownEditor.state.draggingOver).toBe(false);
        });

        describe('valid images, but no onImageDrop prop passed', () => {
            it('does not call onChange', () => {
                const markdownEditor = TestUtils.renderIntoDocument(
                    <MarkdownEditor value={value} onChange={onChangeMock} />
                );

                expect(onChangeMock.mock.calls.length).toBe(0);

                TestUtils.Simulate.drop(
                    TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                    { dataTransfer: { files: validFile } }
                );

                expect(onChangeMock.mock.calls.length).toBe(0);
            });
        });

        describe('onImageDrop prop passed', () => {
            describe('no files passed', () => {
                it('does not call onChange or onImageDrop', () => {
                    const markdownEditor = TestUtils.renderIntoDocument(
                        <MarkdownEditor
                            value={value}
                            onChange={onChangeMock}
                            onImageDrop={onImageDropMock}
                        />
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);

                    TestUtils.Simulate.drop(
                        TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                        { dataTransfer: { files: [] } }
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);
                });
            });

            describe('no images passed', () => {
                it('does not call onChange or onImageDrop', () => {
                    const markdownEditor = TestUtils.renderIntoDocument(
                        <MarkdownEditor
                            value={value}
                            onChange={onChangeMock}
                            onImageDrop={onImageDropMock}
                        />
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);

                    TestUtils.Simulate.drop(
                        TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                        { dataTransfer: { files: invalidFile } }
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);
                });
            });

            describe('invalid response from onImageDrop', () => {
                describe('no filename', () => {
                    it('does not call onChange twice', () => {
                        const markdownEditor = TestUtils.renderIntoDocument(
                            <MarkdownEditor
                                value={value}
                                onChange={onChangeMock}
                                onImageDrop={onImageDropMock}
                            />
                        );

                        expect(onChangeMock.mock.calls.length).toBe(0);
                        expect(onImageDropMock.mock.calls.length).toBe(0);

                        onImageDropMock.mockReturnValueOnce({ url: 'url' });

                        TestUtils.Simulate.drop(
                            TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                            { dataTransfer: { files: validFile } }
                        );

                        expect(onChangeMock.mock.calls.length).toBe(1);
                        expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                        expect(onImageDropMock.mock.calls.length).toBe(1);
                        expect(onImageDropMock).toBeCalledWith(validFile[0]);
                    });
                });

                describe('no url', () => {
                    it('does not call onChange twice', () => {
                        const markdownEditor = TestUtils.renderIntoDocument(
                            <MarkdownEditor
                                value={value}
                                onChange={onChangeMock}
                                onImageDrop={onImageDropMock}
                            />
                        );

                        expect(onChangeMock.mock.calls.length).toBe(0);
                        expect(onImageDropMock.mock.calls.length).toBe(0);

                        onImageDropMock.mockReturnValueOnce({ filename: 'filename' });

                        TestUtils.Simulate.drop(
                            TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                            { dataTransfer: { files: validFile } }
                        );

                        expect(onChangeMock.mock.calls.length).toBe(1);
                        expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                        expect(onImageDropMock.mock.calls.length).toBe(1);
                        expect(onImageDropMock).toBeCalledWith(validFile[0]);
                    });
                });
            });

            describe('one image passed', () => {
                it('calls onChange and onImageDrop', () => {
                    const markdownEditor = TestUtils.renderIntoDocument(
                        <MarkdownEditor
                            value={value}
                            onChange={onChangeMock}
                            onImageDrop={onImageDropMock}
                        />
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);

                    onImageDropMock.mockReturnValueOnce(uploadedImage);

                    TestUtils.Simulate.drop(
                        TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                        { dataTransfer: { files: validFile } }
                    );

                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });
            });

            describe('one image passed with event.target.files', () => {
                it('calls onChange and onImageDrop', () => {
                    const markdownEditor = TestUtils.renderIntoDocument(
                        <MarkdownEditor
                            value={value}
                            onChange={onChangeMock}
                            onImageDrop={onImageDropMock}
                        />
                    );

                    expect(onChangeMock.mock.calls.length).toBe(0);
                    expect(onImageDropMock.mock.calls.length).toBe(0);

                    onImageDropMock.mockReturnValueOnce(uploadedImage);

                    TestUtils.Simulate.drop(
                        TestUtils.findRenderedDOMComponentWithTag(markdownEditor, 'TextArea'),
                        { target: { files: validFile } }
                    );

                    expect(onChangeMock.mock.calls.length).toBe(1);
                    expect(onChangeMock).toBeCalledWith({ target: { value: '\n![uploading image...]()' } });

                    expect(onImageDropMock.mock.calls.length).toBe(1);
                    expect(onImageDropMock).toBeCalledWith(validFile[0]);
                });
            });
        });
    });
});
