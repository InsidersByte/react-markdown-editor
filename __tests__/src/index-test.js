/* eslint-env jest */

jest.unmock('../../src');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MarkdownEditor from '../../src';

describe('MarkdownEditor', () => {
    it('renders', () => {
        const markdownEditor = TestUtils.renderIntoDocument(
            <div>
                <MarkdownEditor />
            </div>
        );

        const containerNode = ReactDOM.findDOMNode(markdownEditor);
        const markdownEditorNode = containerNode.children[0];

        expect(markdownEditorNode).toBeDefined();
        expect(markdownEditorNode).not.toBe(null);
    });
});
