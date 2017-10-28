/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';
import MarkdownEditor from './';

describe('MarkdownEditor', () => {
    const value = '';
    const onChangeMock = jest.genMockFunction();

    beforeEach(() => {
        onChangeMock.mockClear();
    });

    it('renders correctly', () => {
        const markdownEditor = shallow(<MarkdownEditor value={value} onChange={onChangeMock} />);

        expect(markdownEditor).toMatchSnapshot();
    });
});
