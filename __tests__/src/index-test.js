/* eslint-env jest */

jest.unmock('../../src');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MarkdownEditor from '../../src';

let markdownEditor;

const value = '';

const onChangeMock = jest.genMockFunction();

function generateMarkdownEditor() {
    return TestUtils.renderIntoDocument(<MarkdownEditor value={value} onChange={onChangeMock} />);
}

describe('MarkdownEditor', () => {
    beforeEach(() => {
        markdownEditor = generateMarkdownEditor();
        onChangeMock.mockClear();
    });

    it('renders correctly', () => {
        const markdownEditorNode = ReactDOM.findDOMNode(markdownEditor);

        expect(markdownEditorNode).toBeDefined();
        expect(markdownEditorNode).not.toBe(null);
    });
});
