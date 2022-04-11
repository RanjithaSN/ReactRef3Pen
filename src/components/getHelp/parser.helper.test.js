import { Parser } from 'html-to-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Link from 'selfcare-ui/src/components/link/link';
import { getHelpProcessingInstructions } from './parser.helper';

describe('Parser helper', () => {
  describe('When help processing instructions are used...', () => {
    const htmlParser = new Parser();
    const params = {
      helpPage: 'help',
      helpSubpagesToExclude: ['troubleshooter'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      navigatetoUrl: jest.fn(() => {})
    };
    const processingInstructions = getHelpProcessingInstructions(params);
    const isValidNode = () => (true);

    test('It should convert valid help hyperlinks to custom link components with custom onClick', () => {
      const htmlInput = `<p><a href="/${params.helpPage}/valid-subpage/test">Link text</a></p>`;
      const componentExpected = (
        <p>
          <Link onClick={params.navigatetoUrl}>Link text</Link>
        </p>
      );
      const htmlExpected = ReactDOMServer.renderToStaticMarkup(componentExpected);

      const reactComponent = htmlParser.parseWithInstructions(htmlInput, isValidNode, processingInstructions);
      const reactHtml = ReactDOMServer.renderToStaticMarkup(reactComponent);

      expect(reactHtml).toEqual(htmlExpected);
    });

    test('It should not convert help hyperlinks where the subpage is included in helpSubpagesToExclude', () => {
      const htmlInput = `<p><a href="/${params.helpPage}/${params.helpSubpagesToExclude[0]}/test">Link text</a></p>`;
      const htmlExpected = htmlInput;

      const reactComponent = htmlParser.parseWithInstructions(htmlInput, isValidNode, processingInstructions);
      const reactHtml = ReactDOMServer.renderToStaticMarkup(reactComponent);

      expect(reactHtml).toEqual(htmlExpected);
    });
  });
});
